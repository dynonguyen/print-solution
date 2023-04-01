import { ENDPOINTS } from '~/constants/endpoints';
import createAxiosInstance from './create-instance';

const shippingAxios = createAxiosInstance(ENDPOINTS.SHIPPING_API.ROOT);

export default shippingAxios;
