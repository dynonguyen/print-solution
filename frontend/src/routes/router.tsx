import { createBrowserRouter } from 'react-router-dom';
import adminRoute from './admin-route';
import guestRoute from './guest-route';

const router = createBrowserRouter([...guestRoute, ...adminRoute]);

export default router;
