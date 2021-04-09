import axios from 'axios';

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
  (config) => config,
  (error) => Promise.reject(error),
);
service.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);
export default service;
