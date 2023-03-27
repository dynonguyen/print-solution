import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import AdminGuard from '~/components/guard/AdminGuard';
import AdminLayout from '~/components/layout/AdminLayout';
import { PATH } from '~/constants/path';

// -----------------------------
const AdminProductList = React.lazy(() => import('~/features/admin/product/pages/List'));

// -----------------------------
const adminRoute: RouteObject[] = [
  {
    path: PATH.ADMIN.ROOT,
    element: <AdminGuard />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '', element: <Navigate to={PATH.ADMIN.PRODUCT.LIST} /> },
          {
            path: PATH.ADMIN.PRODUCT.LIST,
            element: <AdminProductList />
          }
        ]
      }
    ]
  }
];

export default adminRoute;
