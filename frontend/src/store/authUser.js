import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from 'axios';

const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
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
    login: async () => {},
    logout: async () => {},
    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get('/api/v1/auth/authCheck');
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (err) {
            set({ isCheckingAuth: false, user: null });
            // toast.error('Failed to authenticate');
        }
    },
}));

export default useAuthStore;
