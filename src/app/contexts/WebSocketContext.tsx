// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { WebSocketService } from '../types/WebSocketService';

// interface WebSocketContextType {
//   wsService: WebSocketService | null;
//   isConnected: boolean;
//   sendMessage: (message: any) => void;
// }

// const WebSocketContext = createContext<WebSocketContextType>({
//   wsService: null,
//   isConnected: false,
//   sendMessage: () => {},
// });

// export const WebSocketProvider: React.FC<{ 
//   children: React.ReactNode;
//   roomId: string;
// }> = ({ children, roomId }) => {
//   const [wsService, setWsService] = useState<WebSocketService | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (!token || !roomId) return;

//     const service = new WebSocketService(
//       `wss://fred-server.onrender.com/ws/chat/${roomId}/`,
//       token
//     );

//     service.on('connected', () => setIsConnected(true));
//     service.on('disconnected', () => setIsConnected(false));
    
//     setWsService(service);
//     service.connect();

//     return () => service.disconnect();
//   }, [roomId]);

//   const sendMessage = (message: any) => {
//     wsService?.send(message);
//   };

//   return (
//     <WebSocketContext.Provider value={{ wsService, isConnected, sendMessage }}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };