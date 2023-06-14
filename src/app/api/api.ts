import axios from "axios";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "../constants";

export const api = axios.create({
  baseURL: "http://localhost:1337/api/",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: any) => {
    const token = Cookies.get(TOKEN_NAME);
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
