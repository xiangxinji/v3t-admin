import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '@/utils/token';

const baseURL = process.env.VUE_APP_BASE_API;
const service = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => Promise.reject(error),
);
service.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default function <T> (config : AxiosRequestConfig) {
  return new Promise<ResponseContent<T>>((resolve, reject) => {
    service(config).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    });
  });
}
