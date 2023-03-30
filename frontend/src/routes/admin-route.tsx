import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import AdminGuard from '~/components/guard/AdminGuard';
import AdminLayout from '~/components/layout/AdminLayout';
import { PATH } from '~/constants/path';

// -----------------------------
const AdminProduct = React.lazy(() => import('~/features/admin/product'));
const AdminCategory = React.lazy(() => import('~/features/admin/category'));

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
          { path: '', element: <Navigate to={PATH.ADMIN.CATEGORY} /> },
          { path: PATH.ADMIN.CATEGORY, element: <AdminCategory /> },
          { path: PATH.ADMIN.PRODUCT.LIST, element: <AdminProduct /> }
        ]
      }
    ]
  }
];

export default adminRoute;
