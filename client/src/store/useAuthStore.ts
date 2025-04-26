// lib/store/useAuthStore.ts
import { create } from "zustand";

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
} | null;

interface AuthState {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
