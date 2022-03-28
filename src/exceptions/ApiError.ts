import { ApiErrorProps, IApiError } from '../types/types';

class ApiError extends Error implements IApiError {
  errors: string[] = [];

  constructor({
    message = '',
    errors = [],
  }: ApiErrorProps) {
    super(message);
    this.errors = errors;
  }
}

export default ApiError;
