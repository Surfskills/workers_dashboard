

// Service categories type
export type ServiceCategory = 
  | 'eCommerce'
  | 'CustomService'
  | 'DevOps'
  | 'Consultation'
  | 'Merchandize'
  | 'Integrations Plugins'
  | 'Productivity Apps'
  | 'Communication System'
  | 'POS'
  | 'Authentication Source Codes'
  | 'Integrations'
  | 'Productivity'
  | 'Source';

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  cost: number;
  svgImage: string;
  deliveryTime: string;
  supportDuration: string;
  features: string[];
  processLink: string;
  // Optional fields that might be needed by some components
  bookingPath?: string;
  fullDescription?: string;
  downloadLinks?: string[];
}
