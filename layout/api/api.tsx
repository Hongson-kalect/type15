import axios from "axios";

export const getUser = async () => {
  const res = await axios.post("/api/appUser", session.user);
};
