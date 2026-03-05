import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

httpClient.interceptors.response.use(
  (response) => response,

  (error) => {
    let message = 'Unexpected error';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        message = error.response.data?.message ?? `Error ${error.response.status}`;
      } else if (error.request) {
        message = 'Network error';
      } else {
        message = error.message;
      }
    }

    return Promise.reject(new Error(message));
  }
);
