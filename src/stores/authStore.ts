import { create } from 'zustand';
import { AuthStore, AuthUser } from '../types';
import { AuthService } from '../utils/authService';
import type { SetState } from 'zustand';

export const useAuthStore = create<AuthStore>((set: SetState<AuthStore>) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user: AuthUser | null) => {
    set({
      user,
      isAuthenticated: user !== null
    });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await AuthService.loginUser(email, password);
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: message
      });
      throw error;
    }
  },

  register: async (email: string, password: string, displayName: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await AuthService.registerUser(email, password, displayName);
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: message
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await AuthService.logoutUser();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  initializeAuth: () => {
    set({ isLoading: true });
    const unsubscribe = AuthService.onAuthStateChange((user) => {
      set({
        user,
        isAuthenticated: user !== null,
        isLoading: false
      });
    });

    // Return cleanup function
    return unsubscribe;
  }
}));
