import { CreateParagraphDTO } from "@/interface/dto/paragraph.dto";
import api from "./axios.instance";

export const createParagraph = async (data: CreateParagraphDTO) => {
  const res = await api.post(`/api/paragraph`, data);
  return res.data;
};
