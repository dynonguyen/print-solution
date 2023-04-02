import axios from 'axios';
import getEnv from '~/utils/getEnv';

const createAxiosInstance = (baseURL = '', configs = {}) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', authorization: getEnv('API_KEY') },
    timeout: 5000,
    ...configs
  });

  return axiosInstance;
};

export const accountAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/account`);
export const docsAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/docs`);
export const shippingAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/shipping`);
export const paymentAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/payment`);
export const orderAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/order`);
