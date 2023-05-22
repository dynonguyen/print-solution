import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';

// -----------------------------
interface GuestLayoutProps {}

// -----------------------------
const GuestLayout: React.FC<GuestLayoutProps> = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default React.memo(GuestLayout, () => true);
