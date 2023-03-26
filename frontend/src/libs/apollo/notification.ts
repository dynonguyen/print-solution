import { getEnv } from '~/utils/getEnv';
import createApolloClient from './create-client';

const notificationApolloClient = createApolloClient(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/notification`);

export default notificationApolloClient;
