// src/api/axios.tsx
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL =  "http://localhost:5000/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Attach token automatically (typed)
api.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    try {
      // localStorage may be undefined on server — guard for SSR
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("token");
        if (token) {
          // ensure headers object exists and set Authorization
          if (req.headers) {
            // mutate existing headers object (AxiosHeaders) safely via casting
            (req.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
          } else {
            // create a minimal headers object when none exists
            req.headers = { Authorization: `Bearer ${token}` } as any;
          }
        }
      }
    } catch (err) {
      // swallow - do not block requests if storage access fails
      // console.warn("axios interceptor localStorage read failed", err);
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
