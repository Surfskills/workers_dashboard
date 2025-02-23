
export interface Service {
    id: string;
    category: string;
    title: string;
    description: string;
    fullDescription?: string; // Added this field for detailed description
    cost: number;
    svgImage: string;
    downloadLinks?: string[]; // Added this field for download links
}

export interface AuthenticationProps {

    onAuthSuccess?: (user: { id: string; email: string }) => void;
    redirectPath?: string;
    selectedButton: string | null;
    Cost: number;
    // selectedService: Service;
    selectedService: Service;
    handleButtonClick: (buttonName: string) => void;

}

export interface AuthContextType {
    login: (email: string, password: string) => Promise<{ user: { id: string; email: string } }>;
    signup: (email: string, password: string) => Promise<{ user: { id: string; email: string } }>;
    isAuthenticated: boolean;
    user: { id: string; email: string } | null;
}


