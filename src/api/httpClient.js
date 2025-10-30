import axios from "axios";
import { baseURL } from "../configs/constants";

const http = axios.create({
  baseURL: baseURL || "http://localhost:4000/api",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

const httpClient = {
  get: async (url, config = {}) => {
    return http.get(url, config);
  },
  post: async (url, data, config = {}) => {
    return http.post(url, data, config);
  },
  put: async (url, data, config = {}) => {
    return http.put(url, data, config);
  },
  delete: async (url, config = {}) => {
    return http.delete(url, config);
  },
};

export default httpClient;
