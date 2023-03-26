import React from 'react';
import { RouteObject } from 'react-router-dom';
import NotFoundPage from '~/components/feedback/NotFoundPage';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import GuestGuard from '~/components/guard/GuestGuard';
import GuestLayout from '~/components/layout/GuestLayout';
import { PATH } from '~/constants/path';

// -----------------------------
const HomePage = React.lazy(() => import('~/features/home'));

// -----------------------------
const guestRoute: RouteObject[] = [
  {
    path: PATH.HOME,
    element: <GuestGuard />,
    errorElement: <ServerErrorPage />,
    children: [{ element: <GuestLayout />, children: [{ path: '', element: <HomePage /> }] }]
  },

  // Not found
  { path: PATH.SERVER_ERROR, element: <ServerErrorPage /> },
  { path: PATH.NOT_FOUND, element: <NotFoundPage /> },
  { path: '*', element: <NotFoundPage /> }
];

export default guestRoute;
