import { RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import CustomerGuard from '~/components/guard/CustomerGuard';
import CustomerLayout from '~/components/layout/CustomerLayout';
import { PATH } from '~/constants/path';

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
  }
];

export default customerRoute;
