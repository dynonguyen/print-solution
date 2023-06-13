import React from 'react';
import { RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import GuestGuard from '~/components/guard/GuestGuard';
import GuestLayout from '~/components/layout/GuestLayout';
import { PATH } from '~/constants/path';
import { default as ShoppingCartPage } from '~/features/cart';
import ProductDetail from '~/features/products/pages/Detail';
import ProductSearchPage from '~/features/searchProduct';

// -----------------------------
const HomePage = React.lazy(() => import('~/features/home'));
const OrderPage = React.lazy(() => import('~/features/order'));
const CusContactPage = React.lazy(() => import('~/features/order/pages/CustomerContact'));
const OrdersDetailPage = React.lazy(() => import('~/features/order/pages/OrdersDetail'));
const OrderSuccess = React.lazy(() => import('~/features/order/pages/OrderSuccess'));


// const OrderDetails = React.lazy(() => import('~/features/order/pages/Details'));
// const ProductDetailPage = React.lazy(() => import('~/features/products'));
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
          { path: PATH.PRODUCT.SEARCH, element: <ProductSearchPage /> },
          // { path: PATH.PRODUCT.DETAILS, element: <ProductDetail /> },
          { path: PATH.ORDER.ROOT, element: <OrderPage /> },
          // { path: PATH.ORDER.DETAILS, element: <OrderDetails /> },
          // { path: PATH.ORDER.CUS_CONTACT, element: <CusContactPage /> },
          { path: PATH.ORDER.DETAILS, element: <OrdersDetailPage /> },
          // { path: PATH.ORDER.DETAILS, element: <OrderDetails /> },
          { path: PATH.ORDER.CUS_CONTACT, element: <CusContactPage /> },
          { path: PATH.ORDER.SUCCESS, element: <OrderSuccess /> },
          { path: PATH.GUEST.CART, element: <ShoppingCartPage /> }
        ]
      }
    ]
  }
];

export default guestRoute;
