import { ENDPOINTS } from '~/constants/endpoints';
import createAxiosInstance from './create-instance';

const orderAxios = createAxiosInstance(ENDPOINTS.ORDER_API.ROOT);

export default orderAxios;
