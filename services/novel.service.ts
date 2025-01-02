import api from "./axios.instance";
import { mainLayoutStore } from "@/store/mainLayout.store";

export const getNovels = async () => {
  const userId = mainLayoutStore.getState().userInfo?.id;
  const res = await api.get("/api/novel", {
    params: { page: 1, limit: 999, userId },
  });
  return res.data;
};
