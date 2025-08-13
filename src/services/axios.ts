import axios from "axios";

const api = axios.create({
  baseURL: 'http://3.26.3.167:8080/', // 백엔드 API URL
});

export default api;