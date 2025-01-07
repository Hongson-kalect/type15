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
