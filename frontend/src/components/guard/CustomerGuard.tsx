import { Navigate, Outlet } from 'react-router-dom';
import { USER_ROLES } from '~/constants/common';
import { PATH } from '~/constants/path';
import useAuth from '~/hooks/useAuth';

// -----------------------------
const CustomerGuard = () => {
  const { hasRealmRole, authenticated, login } = useAuth();

  if (!authenticated) {
    login();
    return null;
  }

  // Redirect admin back to admin route
  if (authenticated && hasRealmRole(USER_ROLES.ADMIN)) {
    return <Navigate to={PATH.ADMIN.ROOT} />;
  }

  return <Outlet />;
};

export default CustomerGuard;
