import { cookie } from "@/constant/cookie";
import { getCookie } from "@/lib/cookies";
import axios from "axios";

const api = axios.create({
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie(cookie.access_token);

    if (token) {
      config.headers.Authorization = cookie.access_token_method + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
