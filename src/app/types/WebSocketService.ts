// import EventEmitter from 'events';

// export interface WebSocketMessage {
//     type: 'message' | 'typing' | 'heartbeat';
//     content?: string;
//     sender_id?: number;
//     sender_email?: string;
//     timestamp?: string;
//   }
//   export interface WebSocketMessage {
//     content?: string;
//     sender_id?: number;
//     sender_email?: string;
//     timestamp?: string;
//   }
  
//   export interface WebSocketError {
//     code: number;
//     message: string;
//     timestamp: string;
//   }
// export class WebSocketService extends EventEmitter {
//   private ws: WebSocket | null = null;
//   private reconnectAttempts = 0;
//   private readonly MAX_RECONNECT_ATTEMPTS = 5;
//   private readonly RECONNECT_DELAY = 2000;
//   private messageQueue: any[] = [];
//   private heartbeatInterval: NodeJS.Timeout | null = null;

//   constructor(private url: string, private token: string) {
//     super();
//   }
//   private handleError(error: any) {
//     const wsError: WebSocketError = {
//       code: error.code || 0,
//       message: error.message || 'Unknown error',
//       timestamp: new Date().toISOString()
//     };
//     this.emit('error', wsError);
//   }
//   connect() {
//     try {
//       const wsUrl = `${this.url}?token=${this.token}`;
//       this.ws = new WebSocket(wsUrl);
//       this.setupEventListeners();
//       this.startHeartbeat();
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   private setupEventListeners() {
//     if (!this.ws) return;

//     this.ws.onopen = () => {
//       this.reconnectAttempts = 0;
//       this.emit('connected');
//       this.processMessageQueue();
//     };

//     this.ws.onclose = () => {
//       this.emit('disconnected');
//       this.handleReconnection();
//     };

//     this.ws.onerror = (error) => {
//       this.handleError(error);
//     };

//     this.ws.onmessage = (event) => {
//       this.emit('message', JSON.parse(event.data));
//     };
//   }

//   private startHeartbeat() {
//     this.heartbeatInterval = setInterval(() => {
//       this.send({ type: 'heartbeat' });
//     }, 30000);
//   }

//   send(message: any) {
//     if (this.ws?.readyState === WebSocket.OPEN) {
//       this.ws.send(JSON.stringify(message));
//     } else {
//       this.messageQueue.push(message);
//     }
//   }

//   private processMessageQueue() {
//     while (this.messageQueue.length > 0 && this.ws?.readyState === WebSocket.OPEN) {
//       const message = this.messageQueue.shift();
//       this.send(message);
//     }
//   }

//   private handleReconnection() {
//     if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
//       setTimeout(() => {
//         this.reconnectAttempts++;
//         this.connect();
//       }, this.RECONNECT_DELAY);
//     } else {
//       this.emit('reconnect_failed');
//     }
//   }

//   disconnect() {
//     if (this.heartbeatInterval) {
//       clearInterval(this.heartbeatInterval);
//     }
//     this.ws?.close();
//   }
// }