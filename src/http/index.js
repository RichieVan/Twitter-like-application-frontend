import axios from 'axios';

export const STATIC_URL = process.env?.NODE_ENV === 'development' ? 'http://localhost:8101' : 'https://rvbackend.herokuapp.com';
export const API_URL = process.env?.NODE_ENV === 'development' ? 'http://localhost:8101/api' : 'https://rvbackend.herokuapp.com/api';
export const APP_URL = process.env?.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://rvfront.herokuapp.com';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const updatedConfig = config;
  if (localStorage.getItem('accessToken') !== null) {
    updatedConfig.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return updatedConfig;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !originalRequest.isRetry) {
      originalRequest.isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
        console.log(response);
        localStorage.setItem('accessToken', response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        localStorage.removeItem('accessToken');
      }
    }
    throw error;
  },
);

export default api;
