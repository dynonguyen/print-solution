import React from 'react';
import { Outlet } from 'react-router-dom';

// -----------------------------
interface AdminGuardProps {}

// -----------------------------
const AdminGuard: React.FC<AdminGuardProps> = () => {
  return <Outlet />;
};

export default AdminGuard;
