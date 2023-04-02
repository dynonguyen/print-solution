import { KeycloakInitOptions } from 'keycloak-js';
import React from 'react';
import { PATH } from '~/constants/path';
import useAuth from './useAuth';

// -----------------------------
const useKeycloakInit = (initOptions?: KeycloakInitOptions): boolean => {
  const { init, authenticated, loadUserInfo, loadUserProfile } = useAuth();
  const [loading, setLoading] = React.useState(!Boolean(authenticated));

  React.useEffect(() => {
    if (loading) {
      init({ onLoad: 'check-sso', checkLoginIframe: false, responseMode: 'query', ...initOptions })
        .then(async (isAuth) => {
          if (isAuth) await Promise.all([loadUserInfo(), loadUserProfile()]);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Authentication init error: ', err);
          window.location.href = PATH.SERVER_ERROR;
        });
    }
  }, []);

  return loading;
};

export default useKeycloakInit;
