import { RouteObject } from 'react-router-dom';
import NotFoundPage from '~/components/feedback/NotFoundPage';
import ServerErrorPage from '~/components/feedback/ServerErrorPage';
import { PATH } from '~/constants/path';

// -----------------------------
const commonRoute: RouteObject[] = [
  { path: PATH.SERVER_ERROR, element: <ServerErrorPage /> },
  { path: PATH.NOT_FOUND, element: <NotFoundPage /> },
  { path: '*', element: <NotFoundPage /> }
];

export default commonRoute;
