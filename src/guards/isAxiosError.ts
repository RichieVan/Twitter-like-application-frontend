import { AxiosError } from 'axios';

function isAxiosError<T>(error: any): error is AxiosError<T> {
  const result = (error as AxiosError<T>)?.isAxiosError;
  return result;
}

export default isAxiosError;
