import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send } from 'lucide-react';
import axios, { AxiosError } from 'axios';

interface ChatRoom {
  id: number;
  object_id: number;
  client: number;
  admin: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface ChatRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  adminId?: number;
}

interface Message {
  content: string;
  sender_id: number;
  sender_email: string;
  timestamp: string;
  is_read: boolean;
  read_at: string | null;
}

interface User {
  id: number;
  email: string;
  is_admin: boolean;
  is_client: boolean;
}

const debug = {
  log: (component: string, action: string, data?: unknown) => {
    console.log(`[${component}][${new Date().toISOString()}] ${action}`, data || '');
  },
  error: (component: string, action: string, error: Error | AxiosError | unknown) => {
    console.error(`[${component}][${new Date().toISOString()}] ${action}:`, error);
    if (error instanceof AxiosError && error.response) {
      console.error('Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    }
  }
};

const ChatRoomModal: React.FC<ChatRoomModalProps> = ({ 
  isOpen, 
  onClose, 
  roomId, 
  adminId 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState(new Set<number>());
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [availableAdmins, setAvailableAdmins] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const webSocket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 2000;

  const fetchMessageHistory = useCallback(async () => {
    try {
      if (!chatRoom) return;

      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await axios.get(
        `https://fred-server.onrender.com/api/chat/messages/${chatRoom.id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      debug.log('Messages', 'Fetched message history', response.data);
      setMessages(response.data);
    } catch (error) {
      debug.error('Messages', 'Error fetching message history', error);
    }
  }, [chatRoom]);

  const connectWebSocket = useCallback(() => {
    if (connectionAttempts >= MAX_RECONNECT_ATTEMPTS || !chatRoom) {
      const error = `Max reconnection attempts reached (${connectionAttempts}) or no chat room`;
      debug.error('WebSocket', 'Connection Failed', error);
      setLastError(error);
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      debug.error('WebSocket', 'Connection Error', 'No access token found');
      return;
    }

    try {
      if (webSocket.current) {
        debug.log('WebSocket', 'Closing existing connection');
        webSocket.current.close();
      }

      const wsUrl = `wss://fred-server.onrender.com/ws/chat/${chatRoom.id}/?token=${token}`;
      debug.log('WebSocket', 'Attempting connection', { url: wsUrl });
      
      const ws = new WebSocket(wsUrl);
      webSocket.current = ws;

      ws.onopen = () => {
        debug.log('WebSocket', 'Connection established');
        setIsConnected(true);
        setConnectionAttempts(0);
        setLastError(null);
        fetchMessageHistory();
      };

      ws.onclose = (event) => {
        debug.log('WebSocket', 'Connection closed', { 
          code: event.code, 
          reason: event.reason,
          wasClean: event.wasClean
        });
        setIsConnected(false);
        
        if (connectionAttempts < MAX_RECONNECT_ATTEMPTS && isOpen) {
          debug.log('WebSocket', 'Scheduling reconnect', { 
            attempt: connectionAttempts + 1,
            delay: RECONNECT_DELAY
          });
          reconnectTimeoutRef.current = setTimeout(() => {
            setConnectionAttempts(prev => prev + 1);
            connectWebSocket();
          }, RECONNECT_DELAY);
        }
      };

      ws.onerror = (error) => {
        debug.error('WebSocket', 'Connection error', {
          error,
          readyState: ws.readyState,
          bufferedAmount: ws.bufferedAmount,
          url: ws.url
        });
        setLastError('WebSocket connection error');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          debug.log('WebSocket', 'Message received', data);
          
          if (data.type === 'message') {
            const newMessage: Message = {
              content: data.message,
              sender_id: data.sender_id,
              sender_email: data.sender_email,
              timestamp: data.timestamp,
              is_read: false,
              read_at: null
            };
            setMessages((prev) => [...prev, newMessage]);
          } else if (data.type === 'typing') {
            setTypingUsers((prev) => {
              const newSet = new Set(prev);
              if (data.is_typing) {
                newSet.add(data.user_id);
              } else {
                newSet.delete(data.user_id);
              }
              return newSet;
            });
          }
        } catch (error) {
          debug.error('WebSocket', 'Error parsing message', error);
        }
      };
    } catch (error) {
      debug.error('WebSocket', 'Error establishing connection', error);
    }
  }, [connectionAttempts, chatRoom, isOpen, fetchMessageHistory]);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        const [userResponse, adminsResponse] = await Promise.all([
          axios.get('https://fred-server.onrender.com/api/auth/users/', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://fred-server.onrender.com/api/auth/admins/', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (!mounted) return;

        const user = userResponse.data;
        const admins = adminsResponse.data;

        setCurrentUser(user);
        setAvailableAdmins(admins);

        const selectedAdmin = adminId || (admins.length > 0 ? admins[0].id : null);
        if (!selectedAdmin) {
          throw new Error('No admin available');
        }

        try {
          const searchResponse = await axios.get(
            `https://fred-server.onrender.com/api/chat/chatrooms/search/`,
            { 
              headers: { Authorization: `Bearer ${token}` },
              params: {
                object_id: roomId,
              }
            }
          );
          
          if (!mounted) return;
          debug.log('ChatRoom', 'Chatroom found', searchResponse.data);
          setChatRoom(searchResponse.data);
          
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            debug.log('ChatRoom', 'No existing chatroom found, creating new one');
            
            const createData = {
              object_id: parseInt(roomId),
              user_id: user.is_admin ? user.id : selectedAdmin
            };

            const createResponse = await axios.post(
              'https://fred-server.onrender.com/api/chat/chatrooms/',
              createData,
              {
                headers: { 
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            
            if (!mounted) return;
            debug.log('ChatRoom', 'New chatroom created', createResponse.data);
            setChatRoom(createResponse.data);
          } else {
            debug.error('ChatRoom', 'Error searching/creating chatroom', error);
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
              ? error.response.data.error
              : 'Failed to initialize chat room';
            throw new Error(errorMessage);
          }
        }
      } catch (error) {
        debug.error('ChatRoom', 'Error in initialization', error);
        setLastError(error instanceof Error ? error.message : 'Failed to initialize chat room');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [isOpen, roomId, adminId]);

  useEffect(() => {
    if (isOpen && !isLoading && chatRoom) {
      connectWebSocket();
    }

    return () => {
      if (webSocket.current) {
        webSocket.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isOpen, isLoading, chatRoom, connectWebSocket]);

  const sendMessage = () => {
    if (!newMessage.trim() || !isConnected || !webSocket.current) {
      return;
    }

    const messageData = {
      type: 'message',
      content: newMessage,
      sender_id: currentUser?.id || 0,
      sender_email: currentUser?.email || 'unknown',
      timestamp: new Date().toISOString(),
    };

    webSocket.current.send(JSON.stringify(messageData));
    setNewMessage('');
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (webSocket.current) {
      webSocket.current.send(
        JSON.stringify({ type: 'typing', user_id: currentUser?.id || 0, is_typing: true })
      );
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (webSocket.current) {
        webSocket.current.send(
          JSON.stringify({ type: 'typing', user_id: currentUser?.id || 0, is_typing: false })
        );
      }
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat Room</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <span>Loading chat room...</span>
          </div>
        ) : lastError ? (
          <div className="flex-1 flex items-center justify-center text-red-500 p-4">
            {lastError}
          </div>
        ) : (
          <>
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender_id === currentUser?.id
                      ? 'flex justify-end'
                      : 'flex justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender_id === currentUser?.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <div className="text-sm mb-1">
                      {message.sender_email}
                    </div>
                    <div>{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Typing Indicator */}
            {typingUsers.size > 0 && (
              <div className="px-4 text-sm text-gray-500">
                {Array.from(typingUsers)
                  .map(id => availableAdmins.find(admin => admin.id === id)?.email || 'Someone')
                  .join(', ')}{' '}
                is typing...
              </div>
            )}

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  onClick={sendMessage}
                  disabled={!isConnected}
                  className={`p-2 rounded-lg ${
                    isConnected
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatRoomModal;
