'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { sendPasswordResetEmail } = useAuth(); // Reset password function from AuthContext

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await sendPasswordResetEmail(email); // Call the reset password function
            setIsEmailSent(true); // Show success message
        } catch (err) {
            console.error('Forgot password error:', err);
            setError('An error occurred while sending the reset link');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleForgotPassword} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div>
                <label htmlFor="forgot-email" className="block text-xs text-gray-600">
                    Enter your email to receive a reset link
                </label>
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
                    onClick={onBack}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Back to Sign In
                </button>
            </div>
        </form>
    );
}
