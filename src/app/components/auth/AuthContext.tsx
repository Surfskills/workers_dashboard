import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    access_token?: string;
    refresh_token?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ user: User; access: string; refresh: string }>;
    signup: (email: string, password: string) => Promise<{ user: User; access: string; refresh: string }>;
    logout: () => void;
    isAuthenticated: boolean;
    sendPasswordResetEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'https://fred-server.onrender.com';

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Check authentication status on mount and token changes
    useEffect(() => {
        const checkAuth = async () => {
            const savedUser = localStorage.getItem('user');
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');

            if (savedUser && accessToken && refreshToken) {
                try {
                    console.log('Verifying token...');
                    // Verify token is still valid
                    const response = await fetch(`${API_BASE_URL}/api/auth/verify/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: accessToken })
                    });

                    if (response.ok) {
                        console.log('Token is valid');
                        setUser(JSON.parse(savedUser));
                    } else {
                        console.log('Token invalid, attempting refresh...');
                        // Token invalid, try refresh
                        const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh/`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ refresh: refreshToken })
                        });

                        if (refreshResponse.ok) {
                            const { access } = await refreshResponse.json();
                            console.log('Token refresh successful');
                            localStorage.setItem('access_token', access);
                            setUser(JSON.parse(savedUser));
                        } else {
                            console.log('Token refresh failed');
                            // Refresh failed, clear everything
                            logout();
                        }
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    logout();
                }
            } else {
                console.log('No stored auth data found');
                logout();
            }
            setLoading(false);
        };

        checkAuth();

        // Set up an interval to check token validity
        const interval = setInterval(checkAuth, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    const login = async (email: string, password: string): Promise<{ user: User; access: string; refresh: string }> => {
        try {
            console.log('Attempting login...');
            const response = await fetch(`${API_BASE_URL}/api/auth/auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, is_signup: false }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Login failed');
            }
            console.log('Login successful');
            const { access, refresh, user: userData } = result;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            return { user: userData, access, refresh };
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const signup = async (email: string, password: string): Promise<{ user: User; access: string; refresh: string }> => {
        try {
            console.log('Attempting signup...');
            const response = await fetch(`${API_BASE_URL}/api/auth/auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, is_signup: true }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Signup failed');
            }
            console.log('Signup successful');
            const { access, refresh, user: userData } = result;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            return { user: userData, access, refresh };
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const logout = () => {
        console.log('Logging out...');
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    const isAuthenticated = !!user;

    const sendPasswordResetEmail = async (email: string): Promise<void> => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to send reset link');
            }
        } catch (error) {
            console.error('Password reset failed:', error);
            throw error;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, sendPasswordResetEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
