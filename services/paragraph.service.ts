import { CreateParagraphDTO } from "@/interface/dto/paragraph.dto";
import api from "./axios.instance";
import { ParagraphFilterType, UserAction } from "@/interface/type/paragraph";
import { mainLayoutStore } from "@/store/mainLayout.store";

export const createParagraphApi = async (data: CreateParagraphDTO) => {
  const res = await api.post(`/api/paragraph`, data);
  return res.data;
};

export const getParagraphApi = async (filter: ParagraphFilterType) => {
  const res = await api.get(`/api/paragraph`, { params: filter });
  return res.data;
};

export const getParagraphCountApi = async (filter: ParagraphFilterType) => {
  const res = await api.get(`/api/paragraph/count`, { params: filter });
  return res.data;
};

export const getParagraphDetailApi = async (id: number) => {
  const res = await api.get(`/api/paragraph/${id}`);
  return res.data;
};

export const getParagraphComment = async ({
  paragraphId,
}: {
  paragraphId: number;
}) => {
  const res = await api.get(`/api/comment`, {
    params: {
      paragraphId,
    },
  });
  return res.data;
};

export const getParagraphUserActionState = async ({
  paragraphId,
}: {
  paragraphId: number;
}) => {
  const res = await api.get(`/api/paragraph/user-action`, {
    params: {
      paragraphId,
      userId: mainLayoutStore.getState().userInfo?.id,
    },
  });
  return res.data;
};

export const paragraphUserAction = async (body: UserAction) => {
  const res = await api.post(`/api/paragraph/user-action`, body);
  return res.data;
};
