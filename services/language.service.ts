import { AddLanguageDTO } from "@/interface/dto/language.dto";
import { ILanguage } from "@/interface/schema/schema.interface";
import axios from "axios";

export const addLanguage = async (language: AddLanguageDTO) => {
  const res = await axios.post("/api/language", language);
  return res.data;
};

export const updateLanguage = async (language: ILanguage) => {
  const { id, createdAt, updatedAt, ...data } = language;
  const res = await axios.put(`/api/language/${id}`, data);
  return res.data;
};

export const deleteLanguage = async (id: number) => {
  const res = await axios.delete(`/api/language/${id}`);
  return res.data;
};
