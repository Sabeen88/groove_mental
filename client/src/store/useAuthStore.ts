import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => {
        set({ user });
        if (user?.token) {
          localStorage.setItem("token", user.token);
        }
      },

      logout: () => {
        set({ user: null });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      },

      isAuthenticated: () => {
        const { user } = get();
        return user !== null && user.token !== undefined;
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      // Only persist the user data
      partialize: (state) => ({ user: state.user }),
    }
  )
);
