import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Bell,
  Users,
  LogOut, 
} from 'lucide-react';

export default function AdminDashboard() {
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      sessionStorage.clear();
      navigate('/login');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-yellow-50 min-h-screen flex pl-72">
      {/* Sidebar */}
      <aside className="w-72 h-screen p-6 fixed top-0 left-0 bg-white bg-gradient-to-br from-purple-100 to-yellow-100 shadow-2xl flex flex-col gap-8 rounded-r-3xl z-20">
        
        <Link to="/admindashboard" className="flex justify-center mb-6">
          <img
            src="./src/image/Logo.jpeg" 
            alt="Logo"
            className="w-24 h-24 object-cover rounded-full border-4 border-purple-400 shadow-lg"
          />
        </Link>

        <h1 className="text-2xl font-bold text-purple-900 text-center tracking-wide mb-4 drop-shadow">
          WELCOME ADMIN
        </h1>

        {/* Notification */}
        <div>
          <button
            onClick={() => setShowNotificationOptions(!showNotificationOptions)}
            className="w-full flex items-center justify-between text-purple-800 font-medium px-5 py-3 rounded-xl bg-purple-100 hover:bg-purple-200 transition shadow-md hover:shadow-lg"
          >
            <span className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              Notification
            </span>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 text-purple-600 ${
                showNotificationOptions ? 'rotate-90' : ''
              }`}
            />
          </button>

          <div
            className={`ml-8 mt-2 flex flex-col gap-2 text-purple-700 overflow-hidden transition-all duration-300 ease-in-out ${
              showNotificationOptions ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <Link
              to="respond1"
              className="px-4 py-2 rounded-lg hover:bg-purple-200 bg-purple-50 shadow-sm hover:shadow transition"
            >
              Respond
            </Link>
          </div>
        </div>

        {/* Management */}
        <div>
          <button
            onClick={() => setShowManagement(!showManagement)}
            className="w-full flex items-center justify-between text-purple-800 font-medium px-5 py-3 rounded-xl bg-purple-100 hover:bg-purple-200 transition shadow-md hover:shadow-lg"
          >
            <span className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              Management
            </span>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 text-purple-600 ${
                showManagement ? 'rotate-90' : ''
              }`}
            />
          </button>
          <div
            className={`ml-8 mt-2 flex flex-col gap-2 text-purple-700 overflow-hidden transition-all duration-300 ease-in-out ${
              showManagement ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <Link
              to="addbus"
              className="px-4 py-2 rounded-lg hover:bg-purple-200 bg-purple-50 shadow-sm hover:shadow transition"
            >
              Add Bus
            </Link>
            <Link
              to="adminbuscard"
              className="px-4 py-2 rounded-lg hover:bg-purple-200 bg-purple-50 shadow-sm hover:shadow transition"
            >
              Bus Detail
            </Link>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center gap-3 text-white font-semibold px-5 py-3 rounded-xl bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
        >
          <LogOut className="w-5 h-5 text-white" />
          Logout
        </button>
      </aside>

      {/* Content area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
