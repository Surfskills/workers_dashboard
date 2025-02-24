// src/types/order.ts
export interface Order {
    id: number;
    title: string;
    description: string;
    cost: number;
    delivery_time: string;
    support_duration: string;
    features?: string[];
    is_taken?: boolean;
  }
  
  export interface Request {
    id: number;
    title: string;
    project_description: string;
    request_type: 'software' | 'research';
    is_taken?: boolean;
  }