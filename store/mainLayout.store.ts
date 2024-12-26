import { IAppUser, ILanguage } from "@/interface/schema/schema.interface";
import { create } from "zustand";

export const mainLayoutStore = create<{
  userInfo: IAppUser | null;
  userLanguage: ILanguage | null;
  languages: ILanguage[] | null;
  setUserInfo: (data: IAppUser | null) => void;
  setUserLanguage: (data: ILanguage | null) => void;
  setLanguages: (data: ILanguage[] | null) => void;
}>((set) => ({
  userInfo: null,
  userLanguage: null,
  languages: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  setUserLanguage: (userLanguage) => set({ userLanguage }),
  setLanguages: (languages) => set({ languages }),
}));
