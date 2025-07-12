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
    <Routes>
      {/* navbar route */}
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Home />
          </>
        }
      />
      <Route
        path="/home"
        element={
          <>
            <NavBar />
            <Home />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <NavBar />
            <LoginPage />
          </>
        }
      />
      <Route
        path="/verify"
        element={
          <>
            <NavBar />
            <EmailVerificationPage />
          </>
        }
      />
      <Route
        path="/forgot"
        element={
          <>
            <NavBar />
            <ForgotPassword />
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <NavBar />
            <Contact />
          </>
        }
      />
      <Route
        path="/new"
        element={
          <>
            <NavBar />
            <NewPassword />
          </>
        }
      />
      <Route
        path="/enroll"
        element={
          <>
            <NavBar />
            <EnrollPage />
          </>
        }
      />

      {/* Admin Dashboard route */}
      <Route path="/admindashboard" element={<AdminDashboard />}>
        <Route path="respond1" element={<Respond1 />} />
        <Route path="respond2" element={<Respond2 />} />
      </Route>
    </Routes>
  );
}

export default App;
