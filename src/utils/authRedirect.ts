// utils/authRedirect.ts
export const handleAuthRedirect = {
    // Set the intended destination before redirecting to signin
    setIntendedDestination: (destination: string) => {
        localStorage.setItem('intendedDestination', destination);
    },

    // Get and clear the intended destination after successful login
    getIntendedDestination: () => {
        const destination = localStorage.getItem('intendedDestination');
        localStorage.removeItem('intendedDestination');
        return destination;
    }
};