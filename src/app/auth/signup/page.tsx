'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../components/auth/AuthContext';

// Utility for handling authentication redirects
const handleAuthRedirect = {
    setIntendedDestination: (destination: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('intendedDestination', destination);
        }
    },
    getIntendedDestination: () => {
        if (typeof window !== 'undefined') {
            const destination = localStorage.getItem('intendedDestination');
            localStorage.removeItem('intendedDestination');
            return destination;
        }
        return null;
    }
};

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const { login, signup, sendPasswordResetEmail } = useAuth(); // Destructure the context functions
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check if access_token is available in localStorage
        const token = localStorage.getItem('access_token');
        if (token && pathname !== '/dashboard') {
            console.log('User is already logged in, redirecting to dashboard');
            router.push('/dashboard');
        }
    }, [router, pathname]);

    const handleSubmit = async () => { // Removed 'e'
        setError('');
        setIsLoading(true);

        try {
            let authResult;
            if (isForgotPassword) {
                await sendPasswordResetEmail(email);
                setIsEmailSent(true);
                return;
            } else {
                if (signup) {
                    authResult = await signup(email, password);
                } else {
                    authResult = await login(email, password);
                }

                if (authResult && authResult.access) {
                    localStorage.setItem('access_token', authResult.access);

                    const intendedDestination = handleAuthRedirect.getIntendedDestination();
                    if (intendedDestination) {
                        router.push(intendedDestination);
                    } else {
                        router.push('/dashboard');
                    }
                } else {
                    setError('Authentication failed. Please try again.');
                }
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => { // Removed 'e'
        setError('');
        setIsLoading(true);

        try {
            await sendPasswordResetEmail(email);
            setIsEmailSent(true);
        } catch (err) {
            console.error('Forgot password error:', err);
            setError('An error occurred while sending the reset link');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {isForgotPassword ? 'Forgot Password' : 'Sign in to your account'}
                </h2>

                {!isForgotPassword ? (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
                        <div>
                            <label htmlFor="email" className="block text-xs text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-xs text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setIsForgotPassword(true)}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/auth/signup')}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Create an account
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleForgotPassword} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
                        <div>
                            <label htmlFor="forgot-email" className="block text-xs text-gray-600">Enter your email to receive a reset link</label>
                            <input
                                type="email"
                                id="forgot-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {isEmailSent && (
                            <div className="text-green-500 text-sm text-center">
                                A reset link has been sent to your email.
                            </div>
                        )}
                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setIsForgotPassword(false)}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
