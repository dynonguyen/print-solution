import React from 'react';
import useAuth from '~/hooks/useAuth';
import LoadingScreen from './LoadingScreen';

// -----------------------------
interface AuthLoaderProps {
  children?: React.ReactNode;
}

// -----------------------------
const AuthLoader: React.FC<AuthLoaderProps> = ({ children }) => {
  const { init, loadUserProfile, loadUserInfo } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (loading) {
      init({ onLoad: 'check-sso' })
        .then(async (isAuth) => {
          if (isAuth) await Promise.all([loadUserInfo(), loadUserProfile()]);
          setLoading(false);
        })
        .catch((err) => console.error('Init auth error: ', err));
    }
  }, []);

  console.log(loading);

  return loading ? <LoadingScreen /> : <React.Fragment>{children}</React.Fragment>;
};

export default AuthLoader;
