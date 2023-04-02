import React from 'react';
import { Outlet } from 'react-router-dom';

// -----------------------------
interface GuestLayoutProps {}

// -----------------------------
const CustomerLayout: React.FC<GuestLayoutProps> = () => {
  return <Outlet />;
};

export default CustomerLayout;
