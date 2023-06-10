import { Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Flex, Spinner } from '@cads-ui/core';

// -----------------------------
interface GuestLayoutProps { }

// -----------------------------
const CustomerLayout: React.FC<GuestLayoutProps> = () => {
  return (
    <Suspense
      fallback={
        <Flex sx={{ w: 1, h: `calc(100vh - ${72 + 68}px)` }} center>
          <Spinner size="large" />
        </Flex>
      }
    >
      <Outlet />
    </Suspense>
  )
};

export default CustomerLayout;
