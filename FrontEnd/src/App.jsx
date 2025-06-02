
import NavBar from './layout/NavBar'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './layout/LoginPage'
import Contact from './layout/Contact'

import Home from './layout/Home'
import ForgotPassword from './layout/ForgotPassword'
import './App.css'
import EmailVerificationPage from './layout/EmailVerificationPage'
import IsYourProfile from './layout/IsYourProfile';

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
    <Route path="/isyourprofile" element={<IsYourProfile />} />
    </Routes>
      </div>
    </>
  )
}

export default App
