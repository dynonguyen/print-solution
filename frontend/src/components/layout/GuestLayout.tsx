import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';
import React, { Suspense } from 'react';
import { Box, Flex, Spinner } from '@cads-ui/core';
// -----------------------------
interface GuestLayoutProps { }

// -----------------------------
const GuestLayout: React.FC<GuestLayoutProps> = () => {
  return (
    <>
      <Navbar />
      {/* <Container fixed sx={{ backgroundColor: "white" }}> */}
      <Box sx={{ px: 8 }}>
        <Suspense
          fallback={
            <Flex sx={{ w: 1, h: `calc(100vh - ${72 + 68}px)` }} center>
              <Spinner size="large" />
            </Flex>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
      {/* </Container> */}
      <Footer />
    </>
  );
};

export default React.memo(GuestLayout, () => true);
