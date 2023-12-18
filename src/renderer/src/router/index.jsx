import { createBrowserRouter, Link } from 'react-router-dom'

import Dashboard from '@/pages/Dashboard'
import ManagerDashboard from '@/pages/ManagerDashboard'
import ClassManager from '@/pages/ClassManager'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: '/settings',
    Component: ManagerDashboard,
    children: [
      {
        path: '/settings/class',
        Component: ClassManager
      }
    ]
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
