import axios from 'axios';
import { env } from '@/config/env';
import { store } from '@/store/store';
import { logout } from '@/store/auth/authSlice';
import { normalizeError } from '@/services/helpers/normalizeError';

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
    const apiError = normalizeError(error);

    if (apiError.status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(apiError);
    // TODO: add retry logic for 5xx/network errors
  },
);
