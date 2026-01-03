import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", // backend URL
});


let getToken: (() => Promise<string>) | null = null;


export const setAuthTokenGetter = (fn: () => Promise<string>) => {
  getToken = fn;
};


api.interceptors.request.use(
  async (config) => {
    if (getToken) {
      const token = await getToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
