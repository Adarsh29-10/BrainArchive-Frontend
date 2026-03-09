// shared/api/fastapi.api.ts
import axios from "axios";

export const fastapiApi = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

let getToken: (() => Promise<string>) | null = null;
let tokenPromise: Promise<string> | null = null;

export const setFastapiAuthTokenGetter = (fn: () => Promise<string>) => {
    getToken = fn;
};

fastapiApi.interceptors.request.use(
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