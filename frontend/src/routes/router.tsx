import { createBrowserRouter } from 'react-router-dom';
import adminRoute from './admin-route';
import commonRoute from './common-route';
import guestRoute from './guest-route';

const router = createBrowserRouter([...guestRoute, ...adminRoute, ...commonRoute]);

export default router;
