import { Session } from "next-auth";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";
import { storage } from "@/constant/localStorage";
import appStore from "@/store/app.store";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { toast } from "react-toastify";
import { IAppUser } from "@/interface/schema/schema.interface";
import api from "./axios.instance";

export const getUser = async (userSession: Session | null) => {
  if (!getLocalStorage(storage.user))
    setLocalStorage(storage.user, {
      id: null,
      languageId: null,
      username: "Guest",
      scope: null,
      // Include related models as they are
      asset: [],
      setting: [],
      user: {},
    });

  if (!userSession) return getLocalStorage(storage.user);
  const res = await api.post("/api/user", userSession);
  if (res.data) {
    appStore.setState({ isLogin: true });
  }
  return res.data;
};

export const getLanguages = async () => {
  const res = await api.get("/api/language");
  return res.data;
};

export const changeLanguage = async (languageId: number) => {
  const user = mainLayoutStore.getState().userInfo;
  if (!user) return toast.error("User info not found");
  const localUser = getLocalStorage(storage.user) as IAppUser;
  localUser.languageId = languageId;
  setLocalStorage(storage.user, localUser);
  // setLocalStorage(storage.language, languageId);
  if (!appStore.getState().isLogin || !user.id) return localUser;

  const res = await api.put(`/api/user/${user.id}`, { languageId });
  return res.data;
};
