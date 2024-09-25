import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import BlogEditor from './pages/BlogEditor'
import { RecoilRoot } from 'recoil'
import NewBlogCreate from './pages/NewBlogCreate'
import ReadBlog from './pages/ReadBlog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/signUp',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },{
    path: '/editor',
    element: <BlogEditor />
  },{
    path: '/createBlog',
    element: <NewBlogCreate />
  },{
    path: '/blogPost',
    element: <ReadBlog />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>,
)
