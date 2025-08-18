import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // 백엔드 API URL
  withCredentials: true // 모든 요청에 쿠키 포함
});

export default api;