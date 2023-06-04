import React from 'react';
import { RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import GuestGuard from '~/components/guard/GuestGuard';
import GuestLayout from '~/components/layout/GuestLayout';
import { PATH } from '~/constants/path';
import ProductDetail from '~/features/products';
import QuotationPage from '~/features/quotation';

// -----------------------------
const HomePage = React.lazy(() => import('~/features/home'));
const OrderPage = React.lazy(() => import('~/features/order'));

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
          { path: PATH.ORDER.ROOT, element: <OrderPage /> },
          { path: PATH.ORDER.QUOTATION, element: <QuotationPage /> },
          { path: PATH.PRODUCT.DETAILS, element: <ProductDetail /> }
        ]
      }
    ]
  }
];

export default guestRoute;
