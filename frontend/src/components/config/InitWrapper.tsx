import React from 'react';
import useKeycloakInit from '~/hooks/useKeycloakInit';
import LoadingScreen from '../LoadingScreen';

// -----------------------------
interface InitWrapperProps {
  children?: React.ReactNode;
}

// -----------------------------
const InitWrapper: React.FC<InitWrapperProps> = ({ children }) => {
  const loading = useKeycloakInit();

  if (loading) return <LoadingScreen />;

  return <React.Fragment>{children}</React.Fragment>;
};

export default InitWrapper;
