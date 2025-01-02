import api from "./axios.instance";

export const getCurrencies = async () => {
  const res = await api.get("/api/currency");
  return res.data;
};
