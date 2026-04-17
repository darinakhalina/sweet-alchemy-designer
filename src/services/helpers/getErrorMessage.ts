import type { TFunction } from 'i18next';
import type { ApiError } from '@/services/interfaces/ApiError';
import { ERROR_CODES } from '@/constants/errorCodes';

export const getErrorMessage = (error: ApiError, t: TFunction): string => {
  const key = `errors.${error.code}`;
  const translated = t(key);

  if (translated === key) {
    return t(`errors.${ERROR_CODES.common.unknown}`);
  }

  return translated;
};
