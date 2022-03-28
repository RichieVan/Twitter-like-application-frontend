import ApiError from '../exceptions/ApiError';
import isAxiosError from '../guards/isAxiosError';
import { ApiErrorData } from '../types/types';

class ErrorHelper {
  static handleApiError(e: any): ApiError {
    if (isAxiosError<ApiErrorData>(e) && e.response) {
      const { message, errors } = e.response.data;
      throw new ApiError({ message, errors });
    }

    throw new ApiError({
      message: 'Произошла неизвестная ошибка',
    });
  }

  static handleUnexpectedError(): Error {
    throw Error('Произошла неизвестная ошибка');
  }
}

export default ErrorHelper;
