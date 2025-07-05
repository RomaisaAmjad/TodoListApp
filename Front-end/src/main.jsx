import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,RouterProvider,
} from 'react-router-dom';

import LogIn from './pages/LogInPage.jsx';
import SignUp from './pages/SignUpPage.jsx';
import App from './App.jsx';
import WelcomeUser from './pages/WelcomeUserPage.jsx';
import Tasks from './pages/TasksPage.jsx';
import PageNotFound from './pages/NotFoundPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path:'/welcome',
    element :<WelcomeUser/>
  },{
    path:'/tasks',
    element:<Tasks/>
  },
  {
    path:'*',
    element:<PageNotFound/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
