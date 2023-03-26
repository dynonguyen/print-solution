import { getEnv } from '~/utils/getEnv';
import createAxiosInstance from './create-instance';

const paymentAxios = createAxiosInstance(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/payment`);

export default paymentAxios;
