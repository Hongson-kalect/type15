import axios from "axios";
import { UserSessionDTO } from "./dto";
import { setCookie } from "@/lib/cookies";

export const getUser = async (userSession: UserSessionDTO) => {
  const res = await axios.post("/api/appUser", userSession);
  return res.data;
};

export const getLanguages = async () => {
  const res = await axios.post("/api/language");
  return res.data;
};

export const changeLanguage = async (userId: number, langId: string) => {
  setCookie("langId", langId, 720);
  const res = await axios.put(`/api/appUser/${userId}`, { langId });
  return res.data;
};
