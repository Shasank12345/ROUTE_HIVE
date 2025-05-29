
import NavBar from './layout/NavBar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './layout/LoginPage'
import Contact from './layout/Contact'

import Home from './layout/Home'
import ForgotPassword from './layout/ForgotPassword'
import './App.css'

function App() {
const router =createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
   {
    path:"/forgot",
    element:<ForgotPassword/>
  },
  
  {
    path:"/contact",
    element:<Contact/>
  },
])

  return (
    <>
      <div>
          <NavBar/>
          <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
