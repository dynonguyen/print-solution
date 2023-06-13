import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import AdminGuard from '~/components/guard/AdminGuard';
import AdminLayout from '~/components/layout/AdminLayout';
import { PATH } from '~/constants/path';

// -----------------------------
const AdminCategory = React.lazy(() => import('~/features/admin/category'));
const AdminProductListPage = React.lazy(() => import('~/features/admin/product/pages/List'));
const AdminNewProductPage = React.lazy(() => import('~/features/admin/product/pages/New'));
const AdminEditProductPage = React.lazy(() => import('~/features/admin/product/pages/Edit'));
const AdminOrderListPage = React.lazy(() => import('~/features/admin/order/pages/List'));

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
          { path: PATH.ADMIN.PRODUCT.ROOT, element: <Navigate to={PATH.ADMIN.PRODUCT.LIST} /> },
          { path: PATH.ADMIN.PRODUCT.LIST, element: <AdminProductListPage /> },
          { path: PATH.ADMIN.PRODUCT.ADD, element: <AdminNewProductPage /> },
          { path: PATH.ADMIN.ORDER.ROOT, element: <Navigate to={PATH.ADMIN.ORDER.LIST} /> },
          { path: PATH.ADMIN.ORDER.LIST, element: <AdminOrderListPage /> },
          {
            path: PATH.ADMIN.PRODUCT.EDIT,
            element: <AdminEditProductPage />
          },
          { path: '*', element: <Navigate to={PATH.ADMIN.CATEGORY} /> }
        ]
      }
    ]
  }
];

export default adminRoute;
