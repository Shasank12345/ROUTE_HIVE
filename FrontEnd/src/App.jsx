 import NavBar from './layout/NavBar'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './layout/LoginPage'
import Contact from './layout/Contact'
import NewPassword from './layout/NewPassword'
import Home from './layout/Home'
import ForgotPassword from './layout/ForgotPassword'
import EmailVerificationPage from './layout/EmailVerificationPage'
import './App.css'

function App() {
  return (
    <>
      {/* Fixed NavBar */}
      <NavBar />

      {/* Content wrapper with padding-top to avoid overlap */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify" element={<EmailVerificationPage />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/new" element={<NewPassword />} />
        </Routes>
      </div>
    </>
  )
}

export default App
