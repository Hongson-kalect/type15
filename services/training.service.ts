import api from "./axios.instance";

export const getTrainingService = async () => {
  const res = await api.get(`/api/training`);
  return res.data;
};
