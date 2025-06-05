import { StorageKeys } from '@/@common/constants/storage';
import axios from 'axios';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(StorageKeys.JWT_TOKEN);

  config.headers.Authorization = `Bearer ${token ?? ''}`;

  return config;
});

export function setApiBearerToken(token: string): void {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
