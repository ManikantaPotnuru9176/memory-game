import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setShowPassword: (showPassword) => set({ showPassword }),
}));

export default useAuthStore;
