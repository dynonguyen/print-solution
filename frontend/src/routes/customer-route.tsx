import { RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import CustomerGuard from '~/components/guard/CustomerGuard';
import CustomerLayout from '~/components/layout/CustomerLayout';
import { PATH } from '~/constants/path';
import { default as ProductDetail, default as ProductSearchPage } from '~/features/products';

// -----------------------------
const customerRoute: RouteObject[] = [
  {
    path: PATH.CUSTOMER.ROOT,
    element: <CustomerGuard />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        element: <CustomerLayout />,
        children: []
      }
    ]
  },
  {
    path: PATH.PRODUCT.ROOT,
    element: <CustomerGuard />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        element: <CustomerLayout />,
        children: [
          { path: PATH.PRODUCT.DETAILS, element: <ProductDetail /> },
          { path: PATH.PRODUCT.SEARCH, element: <ProductSearchPage /> }
      ]
      }
    ]
  }
];

export default customerRoute;
