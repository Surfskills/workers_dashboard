// src/components/Chat/MessageList.tsx
import React from 'react';
import { Message } from '../../hooks/useChatWebSocket';
import { useAuth } from '../auth/AuthContext';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user } = useAuth();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              msg.sender_id === user?.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            <div className="text-sm opacity-75 mb-1">{msg.sender_email}</div>
            <div>{msg.message}</div>
            <div className="text-xs opacity-50 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;