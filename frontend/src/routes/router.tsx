import { createBrowserRouter } from 'react-router-dom';
import adminRoute from './admin-route';
import commonRoute from './common-route';
import customerRoute from './customer-route';
import guestRoute from './guest-route';

const router = createBrowserRouter([...guestRoute, ...customerRoute, ...adminRoute, ...commonRoute]);

export default router;
