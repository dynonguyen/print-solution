import React from 'react';
import { Outlet } from 'react-router-dom';

// -----------------------------
interface GuestGuardProps {}

// -----------------------------
const GuestGuard: React.FC<GuestGuardProps> = () => {
  return <Outlet />;
};

export default GuestGuard;
