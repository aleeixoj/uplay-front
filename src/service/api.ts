/* eslint-disable dot-notation */
import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'uplay.token': token } = parseCookies();
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export { api };
