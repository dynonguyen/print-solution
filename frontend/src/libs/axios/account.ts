import { ENDPOINTS } from '~/constants/endpoints';
import createAxiosInstance from './create-instance';

const accountAxios = createAxiosInstance(ENDPOINTS.ACCOUNT_API.ROOT);

export default accountAxios;
