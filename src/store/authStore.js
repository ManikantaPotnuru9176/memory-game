import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useAuthStore;
