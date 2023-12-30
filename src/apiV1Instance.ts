import axios from 'axios';

// 환경 변수에서 API 기본 URL을 가져와서 axios 인스턴스를 생성합니다.
const apiV1Instance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
});

// 요청 인터셉터를 설정합니다.
// 모든 요청에 대해 Authorization 헤더에 액세스 토큰을 추가합니다.
apiV1Instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token');

  // 액세스 토큰이 있으면 Authorization 헤더에 추가합니다.
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default apiV1Instance;
