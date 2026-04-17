import axios from 'axios';
import toast from 'react-hot-toast';
import { env } from '@/config/env';
import { store } from '@/store/store';
import { logout } from '@/store/auth/authSlice';

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message
        || error.message
        || 'Something went wrong';

      if (status === 401) {
        store.dispatch(logout());
      } else {
        toast.error(message);
      }
    }

    return Promise.reject(error);
    // TODO: add retry logic for 5xx/network errors
  },
);
