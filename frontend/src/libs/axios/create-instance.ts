import axios, { CreateAxiosDefaults } from 'axios';
import keycloak from '../keycloak';

const createAxiosInstance = (baseURL: string, configs?: CreateAxiosDefaults) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
    ...configs
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = keycloak.token;
      config.headers['authorization'] = token ? `Bearer ${token}` : '';
      return config;
    },
    (error) => {
      throw error;
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status == 401 && keycloak.login) {
        keycloak.login();
      }
      throw error;
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
