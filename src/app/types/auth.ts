// auth.ts
export interface ServiceType {
    id: string;
    category: string;
    title: string;
    description: string;
    fullDescription?: string;
    cost: number;
    svgImage: string;
    downloadLinks?: string[];
}

export interface Service {
    id: string;
    category: string;
    title: string;
    description: string;
    fullDescription?: string;
    cost: number;
    svgImage: string;
    downloadLinks?: string[];
    // Add required fields
    deliveryTime: string;
    supportDuration: string;
    features: string[];
    processLink: string;
}

export interface AuthenticationProps {
    onAuthSuccess?: (user: { id: string; email: string }) => void;
    redirectPath?: string;
    selectedButton: string | null;
    cost: number;
    selectedService: Service; // Use Service type here
    handleButtonClick: (buttonName: string) => void;
}

export interface AuthContextType {
    login: (email: string, password: string) => Promise<{ user: { id: string; email: string } }>;
    signup: (email: string, password: string) => Promise<{ user: { id: string; email: string } }>;
    isAuthenticated: boolean;
    user: { id: string; email: string } | null;
}
