import axiosClient from './axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const api = {
  get: <T>(url: string, params?: object) =>
    axiosClient.get<T>(url, {
      headers: {
        token: cookies.get('token'),
      },
      ...params,
    }),
  post: <T>(url: string, data: any) =>
    axiosClient.post<T>(url, data, {
      headers: {
        token: cookies.get('token'),
      },
    }),
  patch: <T>(url: string, data: any) =>
    axiosClient.patch<T>(url, data, {
      headers: {
        token: cookies.get('token'),
      },
    }),
  delete: <T>(url: string) =>
    axiosClient.delete<T>(url, {
      headers: {
        token: cookies.get('token'),
      },
    }),
};