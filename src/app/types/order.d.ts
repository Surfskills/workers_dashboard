// src/types/Order.ts

export interface Order {
    id: number;
    title: string;
    description: string;
    cost: number;
    delivery_time: string;
    support_duration: string;
    features?: string[]; // Optional features
    payment_status: string;
    order_status: string;
    process_link: string;
}
