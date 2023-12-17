import { createBrowserRouter, Link } from 'react-router-dom'

import Dashboard from '@/pages/Dashboard'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/about",
    element: (
      <div>
        back
        <Link to='/'></Link>
      </div>
    ),
  },
]);

export default router
