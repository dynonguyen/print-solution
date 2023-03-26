import { Navigate, Outlet } from 'react-router-dom';
import { USER_ROLES } from '~/constants/common';
import { PATH } from '~/constants/path';
import useAuth from '~/hooks/useAuth';
import useKeycloakInit from '~/hooks/useKeycloakInit';
import LoadingScreen from '../LoadingScreen';

// -----------------------------
const AdminGuard = () => {
  const { hasRealmRole, authenticated, createLoginUrl } = useAuth();
  const loading = useKeycloakInit();

  if (!loading && !authenticated) {
    return <Navigate to={createLoginUrl()} />;
  }

  if (!loading && !hasRealmRole(USER_ROLES.ADMIN)) return <Navigate to={PATH.NOT_FOUND} />;

  return loading ? <LoadingScreen /> : <Outlet />;
};

export default AdminGuard;
