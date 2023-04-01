import { ENDPOINTS } from '~/constants/endpoints';
import createAxiosInstance from './create-instance';

const docsAxios = createAxiosInstance(ENDPOINTS.DOCS_API.ROOT);

export default docsAxios;
