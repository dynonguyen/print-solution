import { RouteObject } from 'react-router-dom';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import AdminGuard from '~/components/guard/AdminGuard';
import AdminLayout from '~/components/layout/AdminLayout';
import { PATH } from '~/constants/path';

const adminRoute: RouteObject[] = [
  {
    path: PATH.ADMIN.ROOT,
    element: <AdminGuard />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: '',
            element: <>Hello</>
          }
        ]
      }
    ]
  }
];

export default adminRoute;
