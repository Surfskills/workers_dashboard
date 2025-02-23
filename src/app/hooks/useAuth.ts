import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ServiceType {
    id: string;
    title: string;
    description: string;
    deliveryTime: string;
    cost: number;
    supportDuration: string;
    svgImage: string;
    processLink: string;
    features: string[];
    category: string;
}

interface AuthResponse {
    access: string;
    refresh: string;
    user: {
        id: number;
        email: string;
    };
    message: string;
}

const useAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Service creation/association
    const createOrAssociateService = async (
        userId: number,
        selectedService: ServiceType,
        accessToken: string
    ) => {
        try {
            console.log('Creating/Associating service with data:', {
                userId,
                selectedService,
                tokenPresent: !!accessToken,
            });

            if (!selectedService?.id) {
                throw new Error('Invalid service data provided');
            }

            const serviceData = {
                user_id: userId,  // Changed to snake_case
                service_id: selectedService.id,  // Changed to snake_case
                title: selectedService.title,
                description: selectedService.description,
                cost: selectedService.cost,
                delivery_time: selectedService.deliveryTime,  // Changed to snake_case
                features: selectedService.features.join(', '),
                process_link: selectedService.processLink,  // Changed to snake_case
                support_duration: selectedService.supportDuration,  // Changed to snake_case
                svg_image: selectedService.svgImage,  // Changed to snake_case
            };

            console.log('Sending service data:', serviceData);

            const response = await fetch('https://fred-server.onrender.com/api/service/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(serviceData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create service');
            }

            return await response.json();
        } catch (error) {
            console.error('Service creation error:', error);
            throw error;
        }
    };

    // Authentication function
    const authenticate = async (
        email: string,
        password: string,
        isSignUp: boolean, // Use isSignUp flag for logic
        selectedService: ServiceType
    ): Promise<AuthResponse> => {
        try {
            setError(null);  // Reset error state before making request
            console.log('Starting authentication process:', { email, isSignUp });

            // The endpoint is fixed for both signUp and signIn
            const url = 'https://fred-server.onrender.com/api/auth/auth';
            console.log('Making request to:', url);

            // Send authentication request with signUp flag
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    signUp: isSignUp,  // Pass signUp flag to the API
                }),
            });

            const data = await response.json();
            console.log('Auth response:', data);

            // Handle errors if response is not OK
            if (!response.ok) {
                throw new Error(data.message || data.detail || 'Authentication failed');
            }

            // Store tokens in local storage
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            // Create/associate service after authentication
            console.log('Authentication successful, associating service...');
            await createOrAssociateService(data.user.id, selectedService, data.access);

            // Redirect to booking page
            console.log('Redirecting to booking page...');
            router.push(`/services/${selectedService.id}/booking`);

            return data;
        } catch (error) {
            // If error is an instance of Error, return the error message
            const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
            setError(errorMessage);
            console.error('Authentication error:', errorMessage);
            throw new Error(errorMessage);
        }
    };

    return { authenticate, error };
};

export default useAuth;
