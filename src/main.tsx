import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Root from './routes/root.tsx';
import ErrorPage from "./error-page.tsx";
import Home from './routes/home.tsx';
import Create from './routes/create.tsx';
import SignUp from './routes/signUp.tsx'
import SignIn from './routes/signIn.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Create />
      },
      {
        path: "create/",
        element: <Create />
      },
      {
        path: "signup/",
        element: <SignUp />
      },
      {
        path: "signin/",
        element: <SignIn />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
