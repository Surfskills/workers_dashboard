export interface AcceptedOffer {
  id: number;
  status: string;
  service?: ServiceDetails;
  software_request?: SoftwareRequest;
  research_request?: ResearchRequest;
  // Add any other fields from your Django AcceptedOffer model
}
export interface Order {
  id: number;
  title: string;
  software_request?: SoftwareRequest;
  research_request?: ResearchRequest;
  description: string;
  service?: ServiceDetails; 
  cost: number;
  delivery_time: string;
  support_duration: string;
  phone_number?: string; // Optional field
  sizes?: Record<string, any>; // Optional field, JSON object
  features?: string[]; // Optional field
  is_taken?: boolean;
  is_completed?: boolean;
  project_description: string;
  creatorId: number;  // Added creatorId to Order
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';  // New field to track the status
}

export interface Request {
  id: number;
  title: string;
  service?: ServiceDetails; 
  software_request?: SoftwareRequest;
  research_request?: ResearchRequest;
  project_description: string;
  request_type: 'software' | 'research';
  description?: string; // Optional field
  cost?: number; // Optional field
  delivery_time?: string; // Optional field
  phone_number?: string; // Optional field
  sizes?: Record<string, any>; // Optional field, JSON object
  features?: string[]; // Optional field
  is_taken?: boolean;
  is_completed?: boolean;
  project_description: string;
  creatorId: number;  // Added creatorId to Request
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';  // New field to track the status
  payment_status: 'unpaid' | 'paid';  // New field for payment status
  order_status: 'open' | 'closed';  // New field for order status
  created_at: string;
  updated_at: string;
  user: number;
}

export interface SoftwareRequest extends Request {
  request_type: 'software';
  budget_range: string;
  timeline: string;
  frontend_languages: string;
  frontend_frameworks: string;
  backend_languages: string;
  backend_frameworks: string;
  ai_languages: string;
  ai_frameworks: string;
}

export interface SoftwareRequestData extends BaseRequestData {
  requestType: 'software';
  budgetRange: string;
  timeline: string;
  frontendLanguages: string;
  frontendFrameworks: string;
  backendLanguages: string;
  backendFrameworks: string;
  aiLanguages: string;
  aiFrameworks: string;
}

export interface ResearchRequest extends Request {
  request_type: 'research';
  academic_writing_type: string;
  writing_technique: string;
  academic_writing_style: string;
  critical_writing_type: string;
  critical_thinking_skill: string;
  critical_writing_structure: string;
  discussion_type: string;
  discussion_component: string;
  number_of_pages: number;
  number_of_references: number;
  citation_style: string;
  study_level: string;
  deadline: string;
  cost: number;
}

export interface ResearchRequestData extends BaseRequestData {
  requestType: 'research';
  academicWritingType: string;
  writingTechnique: string;
  academicWritingStyle: string;
  criticalWritingType: string;
  criticalThinkingSkill: string;
  criticalWritingStructure: string;
  discussionType: string;
  discussionComponent: string;
  numberOfPages: number;
  numberOfReferences: number;
  citationStyle: string;
  studyLevel: string;
  deadline: string;
  cost: number;
}

export type CustomRequestData = SoftwareRequestData | ResearchRequestData;
