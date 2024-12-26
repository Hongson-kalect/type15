import { create } from "zustand";

export const appStore = create<{
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
}));

export default appStore;
