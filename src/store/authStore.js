import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  isPasswordMatch: false,
  errorPassword: [false, false],
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setShowPassword: (showPassword) => set({ showPassword }),
  setIsPasswordMatch: (isPasswordMatch) => set({ isPasswordMatch }),
  setErrorPassword: (errorPassword) => set({ errorPassword }),
  handleMatch: () =>
    set((state) => {
      return state.password === state.confirmPassword
        ? { errorPassword: [state.errorPassword[0], false] }
        : { errorPassword: [state.errorPassword[0], true] };
    }),
}));

export default useAuthStore;
