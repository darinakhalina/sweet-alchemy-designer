export const ERROR_CODES = {
  common: {
    unknown: 'unknown',
    networkError: 'networkError',
    serverError: 'serverError',
    timeout: 'timeout',
  },
  auth: {
    unauthorized: 'authUnauthorized',
    sessionExpired: 'authSessionExpired',
    invalidCredentials: 'authInvalidCredentials',
  },
  desserts: {
    fetchFailed: 'dessertsFetchFailed',
    notFound: 'dessertsNotFound',
  },
} as const;
