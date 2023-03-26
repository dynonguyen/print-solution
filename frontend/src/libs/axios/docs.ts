import { getEnv } from '~/utils/getEnv';
import createAxiosInstance from './create-instance';

const docsAxios = createAxiosInstance(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/docs`);

export default docsAxios;
