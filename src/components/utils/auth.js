import axios from 'axios';

const API = axios.create({
  baseURL: ' http://127.0.0.1:8000/',
});

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refreshToken')
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(' https://0c57-105-113-26-71.ngrok-free.app/api/token/refresh/', {
          refresh: localStorage.getItem('refreshToken'),
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest); // ✅ Don't call API again — use axios directly!
      } catch (refreshErr) {
        console.error('Token refresh failed', refreshErr);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
