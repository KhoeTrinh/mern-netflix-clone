import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from 'axios';

const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post(
                '/api/v1/auth/signup',
                credentials
            );
            set({ user: response.data.user, isSigningUp: false });
            toast.success('Account created successfully');
        } catch (err) {
            toast.error(err.response.data.message || 'An error occurred');
            set({ isSigningUp: false, user: null });
        }
    },
    login: async (credentials) => {
        set({ isSigningUp: true })
        try {
            const response = await axios.post('/api/v1/auth/login', credentials)
            set({ user: response.data.user, isLoggingIn: false})
            toast.success('User logged in successfully')
        } catch (err) {
            set({ isLoggingIn: false, user: null })
            toast.error(err.response.data.message || 'Login failed')
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post('/api/v1/auth/logout');
            set({ user: null, isLoggingOut: false });
            toast.success('Logged out successfully');
        } catch (err) {
            set({ isLoggingOut: false });
            toast.error(err.response.data.message || 'Logout failed')
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true });
        const hadAuthCheck = localStorage.getItem('authCheck') || ''
        try {
            const response = await axios.get('/api/v1/auth/authCheck', hadAuthCheck);
            set({ user: response.data.user, isCheckingAuth: false });
            const token = response.data.token
            localStorage.setItem('authCheck', token);
        } catch {
            set({ isCheckingAuth: false, user: null });
        }
    },
}));

export default useAuthStore;
