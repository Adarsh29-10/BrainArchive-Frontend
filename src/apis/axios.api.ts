import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000" , 
  withCredentials: true,
});


let getToken: (() => Promise<string>) | null = null;
let tokenPromise: Promise<string> | null = null; 

export const setAuthTokenGetter = (fn: () => Promise<string>) => {
  getToken = fn;
};


api.interceptors.request.use(
  async (config) => {
    if (getToken) {
      if (!tokenPromise) {
        tokenPromise = getToken().finally(() => {
          tokenPromise = null;
        });
      }

      const token = await tokenPromise;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)
