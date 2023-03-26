import { getEnv } from '~/utils/getEnv';
import createAxiosInstance from './create-instance';

const shippingAxios = createAxiosInstance(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/shipping`);

export default shippingAxios;
