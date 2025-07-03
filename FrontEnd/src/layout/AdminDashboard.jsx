import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  ChevronRight,
  Bell,
  Users,
} from 'lucide-react';

export default function AdminDashboard() {
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const [showManageUser, setShowManageUser] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-yellow-50 min-h-screen flex pl-72">
      <nav className="w-72 h-screen p-6 fixed top-0 left-0 bg-white bg-gradient-to-br from-purple-100 to-yellow-100 shadow-2xl flex flex-col gap-8 rounded-r-3xl z-20">
        
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

        <div>
          <button
            onClick={() => setShowNotificationOptions(!showNotificationOptions)}
            aria-expanded={showNotificationOptions}
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
            <Link
              to="#"
              className="px-4 py-2 rounded-lg hover:bg-purple-200 bg-purple-50 shadow-sm hover:shadow transition"
            >
              Complain
            </Link>
          </div>
        </div>

        <Link
          to="#"
          className="flex items-center gap-3 text-purple-800 font-medium px-5 py-3 rounded-xl bg-purple-100 hover:bg-purple-200 transition shadow-md hover:shadow-lg"
        >
          <Users className="w-5 h-5" />
          Manage Bus
        </Link>

        <div>
          <button
            onClick={() => setShowManageUser(!showManageUser)}
            aria-expanded={showManageUser}
            className="w-full flex items-center justify-between text-purple-800 font-medium px-5 py-3 rounded-xl bg-purple-100 hover:bg-purple-200 transition shadow-md hover:shadow-lg"
          >
            <span className="flex items-center gap-3">
              <Bell className="w-5 h-5" />
              ManageUser
            </span>
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 text-purple-600 ${
                showManageUser ? 'rotate-90' : ''
              }`}
            />
          </button>
          <div
            className={`ml-8 mt-2 flex flex-col gap-2 text-purple-700 overflow-hidden transition-all duration-300 ease-in-out ${
              showManageUser ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <Link
              to="#"
              className="px-4 py-2 rounded-lg hover:bg-purple-200 bg-purple-50 shadow-sm hover:shadow transition"
            >
              Staff
            </Link>
            <Link
              to="#"
              className="px-4 py-2 rounded-lg hover:bg-purple-200 bg-purple-50 shadow-sm hover:shadow transition"
            >
              Student
            </Link>
          </div>
        </div>
      </nav>

      {/* This is where the nested route content will appear */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
