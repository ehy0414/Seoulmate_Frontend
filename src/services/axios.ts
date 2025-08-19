import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // 백엔드 API URL
  withCredentials: true // 모든 요청에 쿠키 포함
});

export default api;

// 로컬스토리지 검사해서 세션이 있으면 Authorization 헤더에 추가
// api.interceptors.request.use((config) => {
//   const sessionId = localStorage.getItem("sessionId");
//   if (sessionId) {
//     config.headers.Cookie = `${sessionId}`;
//   }
//   return config;
// });