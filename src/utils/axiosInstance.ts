import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Extend the AxiosRequestConfig to include _retry
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const API_BASE_URL = 'https://fred-server.onrender.com';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(
    (config: ExtendedAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (!error.config) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        // Prevent infinite refresh loops
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    console.log('Attempting token refresh...');
                    const response = await axios.post(`${API_BASE_URL}/api/auth/refresh/`, {
                        refresh: refreshToken,
                    });
                    
                    const { access, refresh } = response.data;
                    console.log('Token refresh successful');

                    // Store new tokens
                    localStorage.setItem('access_token', access);
                    localStorage.setItem('refresh_token', refresh);

                    // Retry the original request with the new access token
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.error('Token refresh failed:', err);
                    if (axios.isAxiosError(err) && err.response?.status === 401) {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        localStorage.removeItem('user');
                        window.location.href = '/auth/signin';
                    }
                    return Promise.reject(err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
