import { Routes, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import LoginPage from './layout/LoginPage';
import Contact from './layout/Contact';
import NewPassword from './layout/NewPassword';
import Home from './layout/Home';
import ForgotPassword from './layout/ForgotPassword';
import EmailVerificationPage from './layout/EmailVerificationPage';
import AdminDashboard from './layout/Admin/AdminDashboard';
import EnrollPage from './layout/EnrollPage';
import Respond1 from './layout/Admin/Respond1';
import Respond2 from './layout/Admin/Respond2';
import UserDashboard from './layout/User/UserDashboard';
import DriverDashboard from './layout/Driver/DriverDashboard'
import AdminBuscard from './layout/Admin/Buscard'
import AddBus from './layout/Admin/AddBus';
import  Profile from './layout/Driver/Profile'
import BusCard from './layout/User/BusCard';
import DriverEnroll from './layout/DriverEnroll';
import Map from './layout/Map';

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
        path="/enroll/user"
        element={
          <>
            <NavBar />
            <EnrollPage />
          </>
        }
      />
      <Route
        path="/enroll/driver"
        element={
          <>
            <NavBar />
            <DriverEnroll/>
          </>
        }
      />

       {/* Admin Dashboard route */}
      <Route path="/admindashboard" element={<AdminDashboard />}>
        <Route path="respond1" element={<Respond1 />} />
        <Route path="respond2" element={<Respond2 />} />
         <Route path="adminbuscard" element={<AdminBuscard />} />
         <Route path="addbus" element={<AddBus/>} />
         <Route path="map" element={<Map />} /> 
      </Route>

       {/* User dashboard route  */}
      <Route path="/userdashboard" element={<UserDashboard />} >
        <Route path='buscard' element={<BusCard/>}/>
        <Route path="map" element={<Map />} /> 
      </Route>

      {/* Driver dashboard route  */}
      <Route path="/driverdashboard" element={<DriverDashboard/>} >
        <Route path='profile' element={<Profile/>}/>
        <Route path="map" element={<Map />} /> 
      </Route>

    </Routes>
  );
}

export default App;
