import { getEnv } from '~/utils/getEnv';
import createAxiosInstance from './create-instance';

const accountAxios = createAxiosInstance(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/account`);

export default accountAxios;
