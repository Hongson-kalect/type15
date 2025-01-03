import { CreateParagraphDTO } from "@/interface/dto/paragraph.dto";
import api from "./axios.instance";
import { ParagraphFilterType } from "@/interface/type/paragraph";

export const createParagraphApi = async (data: CreateParagraphDTO) => {
  const res = await api.post(`/api/paragraph`, data);
  return res.data;
};

export const getParagraphApi = async (filter: ParagraphFilterType) => {
  console.log("filter :>> ", filter);
  const res = await api.get(`/api/paragraph`, { params: filter });
  return res.data;
};
