import React from 'react';
import { RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import GuestGuard from '~/components/guard/GuestGuard';
import GuestLayout from '~/components/layout/GuestLayout';
import { PATH } from '~/constants/path';
import ProductDetail from '~/features/products';

// -----------------------------
const HomePage = React.lazy(() => import('~/features/home'));

// -----------------------------
const guestRoute: RouteObject[] = [
  {
    path: PATH.HOME,
    element: <GuestGuard />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          { path: '', element: <HomePage /> },
          { path: PATH.PRODUCT.DETAILS, element: <ProductDetail /> }
        ]
      }
    ]
  }
];

export default guestRoute;
