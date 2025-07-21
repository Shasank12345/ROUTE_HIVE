import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BusFront,
  LogOut,
} from 'lucide-react';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user info on mount
    const fetchUserName = async () => {
      try {
        const res = await fetch('http://localhost:5000/getuser_info', {
          method: 'GET',
          credentials: 'include', // send session cookie
        });
        const data = await res.json();
        if (res.ok) {
          setName(data.name);
        } else {
          setError(data.error || data.message || 'Failed to fetch user info');
        }
      } catch (err) {
        setError('Server error, please try again later');
      }
    };
    fetchUserName();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        const res = await fetch('http://localhost:5000/logout', {
          method: 'POST',
          credentials: 'include', // send session cookie
        });

        if (res.ok) {
          localStorage.removeItem('token');
          sessionStorage.clear();
          navigate('/login');
        } else {
          alert('Logout failed, please try again.');
        }
      } catch (error) {
        alert('Server error during logout.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50">
      <nav className="flex flex-col gap-8 p-6 bg-white shadow-2xl w-72 rounded-r-3xl bg-gradient-to-br from-purple-100 to-yellow-100">
        {/* Logo */}
        <Link to="#" className="flex justify-center mb-6">
          <img
            src="./src/image/Logo.jpeg"
            alt="Logo"
            className="object-cover w-24 h-24 border-4 border-purple-400 rounded-full shadow-lg"
          />
        </Link>

        <h1 className="mb-4 text-2xl font-bold tracking-wide text-center text-purple-900 drop-shadow">
          WELCOME {name || 'No Name'}
        </h1>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <Link
          to="buscard"
          className="flex items-center gap-3 px-5 py-3 font-medium text-purple-800 transition bg-purple-100 shadow-md rounded-xl hover:bg-purple-200 hover:shadow-lg"
        >
          <LayoutDashboard className="w-5 h-5" />
          Profile
        </Link>

        <Link
          to="map"
          className="flex items-center gap-3 px-5 py-3 font-medium text-purple-800 transition bg-purple-100 shadow-md rounded-xl hover:bg-purple-200 hover:shadow-lg"
        >
          <BusFront className="w-5 h-5" />
          Bus Location
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 px-5 py-3 mt-auto font-semibold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 hover:shadow-xl"
        >
          <LogOut className="w-5 h-5 text-white" />
          Logout
        </button>
      </nav>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
