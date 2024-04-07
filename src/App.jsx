import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisteForm'
import Leave from './pages/Leave'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import LeaveHistory from './pages/LeaveHistory'

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
      path: '/leave',
      element:<> <Leave /> </>
      
    }, 
    {
      path: '/profile',
      element:<> <Profile /> </>
      
    },
    {
      path: '/settings',
      element:<> <Settings /> </>
      
    },
    {
      path: '/about',
      element:<> <About /> </>
      ,
    },
    {
      path: '/leave-history',
      element: <> <LeaveHistory /> </>
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
