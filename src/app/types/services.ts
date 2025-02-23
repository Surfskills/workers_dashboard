// // /types/services.ts
// export interface Service{
//   id: string;
//   title: string;
//   description: string;
//   deliveryTime: string;
//   cost: number;
//   supportDuration: string;
//   svgImage: string;
//   features: string[];
//   processLink: string;
//   bookingPath: string;
//   category: 'eCommerce' | 'CustomService' | 'DevOps' | 'Consultation' | 'Merchandize' | 'Integrations' | 'Productivity' | 'Source';
//   fullDescription?: string; // Optional field for a more detailed description
//   downloadLinks?: string[]; // Optional field for download links
// }

// export interface TabOption {
//   id: string;      // Unique identifier for the tab option
//   label: string;   // Label displayed on the tab
// }

// export interface Extra {
//   id: string;
//   title: string;
//   cost?: number;
//   description?: string;
//   type: 'free' | 'premium';
// }

// export interface BookingState {
//   selectedExtras: string[];
//   totalCost: number;
// }

// export interface Service {
//   id: string;
//   // category: string;

//   title: string;
//   description: string;
//   fullDescription?: string; // Added this field for detailed description
//   cost: number;
//   svgImage: string;
//   downloadLinks?: string[]; // Added this field for download links
  
// }

import { ServiceCategory } from './serviceTypes';

export interface Service {
    id: string;
    title: string;
    description: string;
    category: ServiceCategory;
    cost: number | string;
    svgImage: string;
    deliveryTime: string;
    supportDuration: string;
    features: string[];
    processLink: string;
    bookingPath?: string;
    fullDescription?: string;
    downloadLinks?: string[];
}

export type ServiceType = Service;

export interface TabOption {
    id: string;      // Unique identifier for the tab option
    label: string;   // Label displayed on the tab
}

export interface Extra {
    id: string;
    title: string;
    cost?: number;
    description?: string;
    type: 'free' | 'premium';
}

export interface BookingState {
    selectedExtras: string[];
    totalCost: number;
}

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