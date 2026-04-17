interface EnvConfig {
  apiBaseUrl: string;
  isDev: boolean;
  isProd: boolean;
}

export const env: EnvConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
