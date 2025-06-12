
import NavBar from './layout/NavBar'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './layout/LoginPage'
import Contact from './layout/Contact'
import NewPassword from './layout/NewPassword'
import Home from './layout/Home'
import ForgotPassword from './layout/ForgotPassword'
import './App.css'
 import EmailVerificationPage from './layout/EmailVerificationPage'
import AdminDashboard from './layout/AdminDashboard';


function App() {

  return (
    <>
      <div>
          <NavBar/>
            <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
    <Route path="/verify" element={<EmailVerificationPage />} />
    <Route path="/forgot" element={<ForgotPassword/>} />
    <Route path="/contact" element={<Contact />} />
     <Route path="/new" element={<NewPassword />} />
     <Route path='/admindashboard' element={<AdminDashboard/>} />
    </Routes>
      </div>
    </>
  )
}

export default App
