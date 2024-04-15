import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import LeaveHistory from "./pages/LeaveHistory";
import Leave from './pages/Leave'
import ManageLeaves from './pages/ManageLeaves'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element:<> <Home /> </>
      
    },
    {
      path: '/login',
      element:<> <LoginForm /> </>
      
    },
    {
      path: '/register',
      element:<> <RegisterForm /> </>
    },
    {
      path: '/apply-leave',
      element:<> <Leave /> </>
    },
    {
      path: '/leave-history',
      element:<> <LeaveHistory /> </>
    }, 
    {
      path: '/manage-leaves',
      element:<> <ManageLeaves /> </>
    }, 
    {
      path: '/profile',
      element:<> <Profile /> </>
      
    },
    
    {
      path: '/about',
      element:<> <About /> </>
      ,
    },
    {
      path: '/contact',
      element: <> <Contact /> </>
      ,
    },
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
