import { CreateParagraphDTO } from "@/interface/dto/paragraph.dto";
import api from "./axios.instance";
import { ParagraphFilterType } from "@/interface/type/paragraph";

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

export const getParagraphUserAction = async ({
  paragraphId,
}: {
  paragraphId: number;
}) => {
  const res = await api.get(`/api/paragraph/user-action`, {
    params: {
      paragraphId,
    },
  });
  return res.data;
};

export const paragraphActionAction = async (body: { action: "like"| "favorite"|'report'; state: boolean; paragraphId: number }) => {
  const res = await api.post(`/api/paragraph/user-action`, body);
  return res.data;
};

// export const favoriteParagraph = async ({ paragraphId }: { paragraphId: number }) => {
//   const res = await api.post(`/api/paragraph/like`, { paragraphId });
//   return res.data;
// };

// export const reportParagraph = async ({ paragraphId }: { paragraphId: number }) => {
//   const res = await api.post(`/api/paragraph/like`, { paragraphId });
//   return res.data;
// };
