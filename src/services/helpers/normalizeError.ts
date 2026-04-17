import axios from 'axios';
import type { ApiError } from '@/services/interfaces/ApiError';
import { ERROR_CODES } from '@/constants/errorCodes';

export const normalizeError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const data = error.response?.data;

    if (data && typeof data === 'object' && 'code' in data) {
      return {
        code: String(data.code),
        message: String(data.message ?? error.message),
        status,
      };
    }

    if (error.code === 'ECONNABORTED') {
      return {
        code: ERROR_CODES.common.timeout,
        message: error.message,
        status: 0,
      };
    }

    if (!error.response) {
      return {
        code: ERROR_CODES.common.networkError,
        message: error.message,
        status: 0,
      };
    }

    return {
      code: status >= 500 ? ERROR_CODES.common.serverError : ERROR_CODES.common.unknown,
      message: error.message,
      status,
    };
  }

  return {
    code: ERROR_CODES.common.unknown,
    message: error instanceof Error ? error.message : 'Unknown error',
    status: 0,
  };
};
