import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_GATEWAY_URL ||
    'http://100.27.215.243:3000/api/v1'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
