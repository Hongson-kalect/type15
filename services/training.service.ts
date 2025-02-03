import { ITraining } from "@/interface/schema/schema.interface";
import api from "./axios.instance";

export const getTrainingService = async () => {
  const res = await api.get(`/api/training`);
  return res.data;
};

export const deleteTrainingService = async ({ id }: { id: number }) => {
  const res = await api.delete(`/api/training/${id}`);
  return res.data;
};

export const updateTrainingService = async ({
  trainingInfo,
}: {
  trainingInfo: ITraining;
}) => {
  const { id, children, ...rest } = trainingInfo;
  const res = await api.put(`/api/training/${id}`, rest);
  return res.data;
};

export const createTrainingService = async ({
  trainingInfo,
}: {
  trainingInfo: ITraining;
}) => {
  const res = await api.post(`/api/training`, trainingInfo);
  return res.data;
};
