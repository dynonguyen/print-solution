import Keycloak from 'keycloak-js';
import { getEnv } from '~/utils/getEnv';

const keycloak = new Keycloak({
  url: getEnv('VITE_APP_KEYCLOAK_URL'),
  realm: getEnv('VITE_APP_KEYCLOAK_REALM'),
  clientId: getEnv('VITE_APP_KEYCLOAK_CLIENT_ID')
});

export default keycloak;
