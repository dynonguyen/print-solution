import axios from 'axios';
import { getEnv } from '~/utils/getEnv';
import keycloak from '../keycloak';

const accountAxios = axios.create({
  baseURL: `${getEnv('VITE_APP_GATEWAY_PATH')}/api/account`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000
});

accountAxios.interceptors.request.use(
  (config) => {
    const token = keycloak.token;
    config.headers['authorization'] = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => {
    throw error;
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (Number(error.response?.status) === 401) {
      // TODO: handle here
    }
    throw error;
  }
);

export default accountAxios;
