import Keycloak, { KeycloakProfile } from 'keycloak-js';
import keycloak from '~/libs/keycloak';

interface IKeycloak extends Omit<Keycloak, 'userInfo'> {
  userInfo?: KeycloakProfile;
}

const useAuth = (): IKeycloak => {
  return keycloak;
};

export default useAuth;
