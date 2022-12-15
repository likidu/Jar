import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const API_CONFIG: AxiosRequestConfig = {
  baseURL: 'https://localhost:3001',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
};

/**
 * @summary Handler of client error from acutal API calls
 * @param error
 * @returns T
 */
export const clientHandleError = <T>(error: AxiosError) => {
  if (error.response) {
    const { data, status } = <{ data: T; status: number }>error.response;
    console.log(`Client status code: ${status}`);
    console.log(data);

    return data;
  } else {
    console.error(error.message);
  }
};

export const client = axios.create(API_CONFIG);
