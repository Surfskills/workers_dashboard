// utils/auth.ts

// Helper function to get the stored access token from localStorage
export const getAccessToken = (): string | null => {
    return localStorage.getItem('access_token');
};

// Helper function to remove tokens from localStorage
export const clearTokens = (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

// Helper function to store tokens in localStorage
export const storeTokens = (accessToken: string, refreshToken: string): void => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};
