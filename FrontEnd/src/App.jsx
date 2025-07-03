import { Routes, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import LoginPage from './layout/LoginPage';
import Contact from './layout/Contact';
import NewPassword from './layout/NewPassword';
import Home from './layout/Home';
import ForgotPassword from './layout/ForgotPassword';
import EmailVerificationPage from './layout/EmailVerificationPage';
import AdminDashboard from './layout/AdminDashboard';
import EnrollPage from './layout/EnrollPage';
import Respond1 from './layout/Respond1';
import Respond2 from './layout/Respond2';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify" element={<EmailVerificationPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/new" element={<NewPassword />} />
        <Route path="/enroll" element={<EnrollPage />} />

        {/* Nested routes under AdminDashboard */}
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route path="respond1" element={<Respond1 />} />
          <Route path="respond2" element={<Respond2 />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
