import { AddLanguageDTO } from "@/interface/dto/language.dto";
import { ILanguage } from "@/interface/schema/schema.interface";
import api from "./axios.instance";

export const getLanguages = async () => {
  const res = await api.get("/api/language");
  return res.data;
};

export const addLanguage = async (language: AddLanguageDTO) => {
  const res = await api.post("/api/language", language);
  return res.data;
};

export const updateLanguage = async (language: ILanguage) => {
  const { id, createdAt, updatedAt, ...data } = language;
  const res = await api.put(`/api/language/${id}`, data);
  return res.data;
};

export const deleteLanguage = async (id: number) => {
  const res = await api.delete(`/api/language/${id}`);
  return res.data;
};
