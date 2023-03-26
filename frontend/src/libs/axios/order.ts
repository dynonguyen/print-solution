import { getEnv } from '~/utils/getEnv';
import createAxiosInstance from './create-instance';

const orderAxios = createAxiosInstance(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/order`);

export default orderAxios;
