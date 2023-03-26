import { KeycloakInitOptions } from 'keycloak-js';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/path';
import useAuth from './useAuth';

// -----------------------------
const useKeycloakInit = (initOptions?: KeycloakInitOptions): boolean => {
  const { init, authenticated, loadUserInfo, loadUserProfile } = useAuth();
  const [loading, setLoading] = React.useState(!Boolean(authenticated));
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loading) {
      init({ onLoad: 'login-required', checkLoginIframe: false, responseMode: 'query', ...initOptions })
        .then(async (isAuth) => {
          if (isAuth) await Promise.all([loadUserInfo(), loadUserProfile()]);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Authentication init error: ', err);
          navigate(PATH.SERVER_ERROR);
        });
    }
  }, []);

  return loading;
};

export default useKeycloakInit;
