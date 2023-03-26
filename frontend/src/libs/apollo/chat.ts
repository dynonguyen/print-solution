import { getEnv } from '~/utils/getEnv';
import createApolloClient from './create-client';

const chatApolloClient = createApolloClient(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/chat`);

export default chatApolloClient;
