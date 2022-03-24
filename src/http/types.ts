import { AxiosError, AxiosRequestConfig } from 'axios';

interface RetriableAxiosConfig extends AxiosRequestConfig {
  isRetry?: boolean;
}

export interface RetriableError extends AxiosError {
  config: RetriableAxiosConfig;
}
