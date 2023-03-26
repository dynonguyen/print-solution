import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { USER_ROLES } from '~/constants/common';
import { PATH } from '~/constants/path';
import useAuth from '~/hooks/useAuth';
import LoadingScreen from '../LoadingScreen';

// -----------------------------
const AdminGuard = () => {
  const { token, init, login, loadUserProfile, loadUserInfo, hasRealmRole } = useAuth();
  const [loading, setLoading] = React.useState(!Boolean(token));
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loading) {
      init({ onLoad: 'login-required' })
        .then(async (isAuth) => {
          if (isAuth) await Promise.all([loadUserInfo(), loadUserProfile()]);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Init auth error: ', err);
          navigate(PATH.SERVER_ERROR);
        });
    }
  }, []);

  if (!loading && !token) login();
  if (!loading && !hasRealmRole(USER_ROLES.ADMIN)) return <Navigate to={PATH.NOT_FOUND} />;

  return loading ? <LoadingScreen /> : <Outlet />;
};

export default AdminGuard;
