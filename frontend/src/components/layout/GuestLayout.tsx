import React from 'react';
import { Outlet } from 'react-router-dom';

// -----------------------------
interface GuestLayoutProps {}

// -----------------------------
const GuestLayout: React.FC<GuestLayoutProps> = () => {
  return <Outlet />;
};

export default GuestLayout;
