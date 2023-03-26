import { getEnv } from '~/utils/getEnv';
import createApolloClient from './create-client';

const catalogApolloClient = createApolloClient(`${getEnv('VITE_APP_GATEWAY_PATH')}/api/catalog`);

export default catalogApolloClient;
