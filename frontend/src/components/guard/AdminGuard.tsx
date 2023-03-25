import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROLES } from '~/constants/common';
import { PATH } from '~/constants/path';
import useAuth from '~/hooks/useAuth';
import LoadingScreen from '../LoadingScreen';

// -----------------------------
const AdminGuard = () => {
  const { token, init, login, loadUserProfile, loadUserInfo, hasRealmRole } = useAuth();
  const [loading, setLoading] = React.useState(!Boolean(token));

  React.useEffect(() => {
    if (loading) {
      init({ onLoad: 'login-required' }).then(async (isAuth) => {
        if (isAuth) await Promise.all([loadUserInfo(), loadUserProfile()]);
        setLoading(false);
      });
    }
  }, []);

  if (!loading && !token) login();
  if (!loading && !hasRealmRole(ROLES.ADMIN)) return <Navigate to={PATH.NOT_FOUND} />;

  return loading ? <LoadingScreen /> : <Outlet />;
};

export default AdminGuard;
