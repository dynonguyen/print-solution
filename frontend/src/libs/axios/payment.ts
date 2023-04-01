import { ENDPOINTS } from '~/constants/endpoints';
import createAxiosInstance from './create-instance';

const paymentAxios = createAxiosInstance(ENDPOINTS.PAYMENT_API.ROOT);

export default paymentAxios;
