/* eslint-disable dot-notation */
import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

const { 'uplay.token': token, 'uplay.refresh_token': refreshToken } = parseCookies();
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        api
          .post('/refresh-token', {
            token: refreshToken,
          })
          .then((response) => {
            const { data } = response;

            setCookie(undefined, 'uplay.token', data.token, {
              maxAge: 60 * 60 * 1, // 1 hour
            });
            setCookie(undefined, 'uplay.refresh_token', data.refresh_token, {
              maxAge: 60 * 60 * 24 * 5, // 5 dias
            });

            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${data.token}`;
          });
      }
    }
  }
);

export { api };
