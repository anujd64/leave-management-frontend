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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-UeigoBhhJNCUjPTONl7lRkCUQHHV824",
  authDomain: "leave-management-38c55.firebaseapp.com",
  projectId: "leave-management-38c55",
  storageBucket: "leave-management-38c55.appspot.com",
  messagingSenderId: "726174151709",
  appId: "1:726174151709:web:b994a53e11bab00e91c2f4"
};

// Initialize Firebase

function App() {

const app = initializeApp(firebaseConfig);

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
