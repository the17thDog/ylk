import { createBrowserRouter, Link } from 'react-router-dom'

import Dashboard from '@/pages/Dashboard'
import ManagerDashboard from '@/pages/ManagerDashboard'
import ClassManager from '@/pages/ClassManager'
import AccountManager from '@/pages/AccountManager'
import WordManager from '@/pages/WordManager'
import PhraseManager from '@/pages/PhraseManager'
import ArticleManager from '@/pages/ArticleManager'

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
      },
      {
        path: '/settings/account',
        Component: AccountManager
      },
      {
        path: '/settings/word',
        Component: WordManager
      },
      {
        path: '/settings/phrase',
        Component: PhraseManager
      },
      {
        path: '/settings/article',
        Component: ArticleManager
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
