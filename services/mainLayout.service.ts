import axios from "axios";

import { Session } from "next-auth";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";
import { storage } from "@/constant/localStorage";
import appStore from "@/store/app.store";

export const getUser = async (userSession: Session | null) => {
  if (!userSession) return getLocalStorage(storage.user);
  const res = await axios.post("/api/user", userSession);
  if (res.data) {
    appStore.setState({ isLogin: true });
  }
  return res.data;
};

export const getLanguages = async () => {
  const res = await axios.get("/api/language");
  return res.data;
};

export const changeLanguage = async (langId: number, userId?: number) => {
  setLocalStorage(storage.language, langId);

  if (!appStore.getState().isLogin || !userId)
    return getLocalStorage(storage.user);
  const res = await axios.put(`/api/user/${userId}`, { langId });
  return res.data;
};
