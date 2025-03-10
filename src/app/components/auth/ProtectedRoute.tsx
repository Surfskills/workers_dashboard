'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/auth/signin/');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return <>{children}</>;
}