const { default: axios } = require('axios');
const getEnv = require('~/utils/getEnv');

const createAxiosInstance = (baseURL = '', configs = {}) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', authorization: getEnv('API_KEY') },
    timeout: 5000,
    ...configs
  });

  return axiosInstance;
};

exports.docsAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/docs`);
exports.accountAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/account`);
exports.paymentAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/payment`);
exports.orderAxios = createAxiosInstance(`${getEnv('GATEWAY_PATH')}/api/order`);
