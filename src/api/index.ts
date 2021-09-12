import axios, { Method, AxiosResponse } from 'axios';
import { Credentials } from '../hooks/User';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export type HttpData = {
  data: any
  state: 'ok' | 'error' | 'notFound' | 'loading'
}


export const request = <T>(
  method: Method,
  url: string,
  params?: any
): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    params,
  });
};

const authRequest = <T>(
  method: Method,
  url: string,
  params?: any
): Promise<AxiosResponse<T>> => {
  const { cnpj, password }: Credentials = JSON.parse(window.localStorage.getItem('credentials')!)
  return api.request<T>({
    method,
    url,
    params,
    auth: {
      username: cnpj,
      password: password
    }
  });
};

export default authRequest;
