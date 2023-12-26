import axios from 'axios';

const apiV1Instance = axios.create({
  baseURL: 'https://lastpang-backend.fly.dev/api/v1',
});

apiV1Instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default apiV1Instance;