import { CreateNovelDTO } from "@/interface/dto/novel";
import api from "./axios.instance";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { NovelFilterType, UserAction } from "@/interface/type/novel";

export const getNovels = async () => {
  const userId = mainLayoutStore.getState().userInfo?.id;
  const res = await api.get("/api/novel", {
    params: { page: 1, limit: 999, userId },
  });
  return res.data;
};

export const getNovelDetailService = async (id: number) => {
  const res = await api.get(`/api/novel/${id}`);
  return res.data;
};

export const createNovelService = async (data: CreateNovelDTO) => {
  const res = await api.post(`/api/novel`, data);
  return res.data;
};

export const getNovelService = async (filter: NovelFilterType) => {
  const res = await api.get(`/api/novel`, { params: filter });
  return res.data;
};

export const getNovelCountService = async (filter: NovelFilterType) => {
  const res = await api.get(`/api/novel/count`, { params: filter });
  return res.data;
};

export const getNovelCommentService = async ({
  novelId,
}: {
  novelId: number;
}) => {
  const res = await api.get(`/api/comment`, {
    params: {
      novelId,
    },
  });
  return res.data;
};

export const getNovelUserActionStateService = async ({
  novelId,
}: {
  novelId: number;
}) => {
  const res = await api.get(`/api/novel/user-action`, {
    params: {
      novelId,
      userId: mainLayoutStore.getState().userInfo?.id,
    },
  });
  return res.data;
};

export const setNovelUserActionService = async (body: UserAction) => {
  const res = await api.post(`/api/novel/user-action`, body);
  return res.data;
};
