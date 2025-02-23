import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../components/auth/AuthContext';

export interface Message {
  type: string;
  message: string;
  sender_id: string;
  sender_email: string;
  timestamp: string;
}

export const useChatWebSocket = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    if (!user) return;

    const accessToken = localStorage.getItem('access_token');
    const wsUrl = `${process.env.REACT_APP_WS_URL}/ws/chat/${roomId}/?token=${accessToken}`;
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data]);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    ws.current.onerror = () => {
      setError('Connection error occurred');
    };
  }, [roomId, user]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      ws.current?.close();
    };
  }, [connectWebSocket]);

  const sendMessage = (content: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'message',
        message: content
      }));
    }
  };

  return { messages, sendMessage, isConnected, error };
};
