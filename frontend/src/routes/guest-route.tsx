import React from 'react';
import { RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import GuestGuard from '~/components/guard/GuestGuard';
import GuestLayout from '~/components/layout/GuestLayout';
import { PATH } from '~/constants/path';
import ProductDetail from '~/features/products';
import ProductSearchPage from '~/features/searchProduct';

// -----------------------------
const HomePage = React.lazy(() => import('~/features/home'));
const OrderPage = React.lazy(() => import('~/features/order'));
const CusContactPage = React.lazy(() => import('~/features/order/pages/CustomerContact'));

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

          { path: PATH.PRODUCT.DETAILS, element: <ProductDetail /> },
          { path: PATH.PRODUCT.SEARCH, element: <ProductSearchPage /> }
          { path: PATH.ORDER.ROOT, element: <OrderPage /> },
          { path: PATH.ORDER.CUS_CONTACT, element: <CusContactPage /> },
          { path: PATH.PRODUCT.DETAILS, element: <ProductDetail /> }
        ]
      }
    ]
  }
];

export default guestRoute;
