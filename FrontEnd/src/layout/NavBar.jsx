import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', to: '/' },
    { name: 'Contact', to: '/contact' },
    { name: 'Login', to: '/login' },
    { name: 'Enroll', to: '/enroll' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="./src/image/Logo.jpeg"
            alt="Logo"
            className="w-20 h-20 object-contain rounded-full"
          />
          <span className="text-2xl font-bold text-indigo-800">Route Hive</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
          {links.map(({ name, to }, idx) => (
            <React.Fragment key={name}>
              <Link
                to={to}
                className={`relative pb-1 px-2 transition-colors duration-300 ${
                  location.pathname === to
                    ? 'text-indigo-700 font-semibold'
                    : 'hover:text-indigo-700'
                }`}
              >
                {name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-700 transition-all duration-300 hover:w-full"></span>
              </Link>
              {idx !== links.length - 1 && (
                <div className="h-6 border-r border-gray-300 self-center"></div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden bg-white/90 backdrop-blur-sm px-4 pb-4 space-y-3 shadow transition-all duration-300 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {links.map(({ name, to }) => (
          <Link
            key={name}
            to={to}
            onClick={() => setIsOpen(false)}
            className={`block text-gray-800 text-lg transition ${
              location.pathname === to
                ? 'text-indigo-700 font-semibold'
                : 'hover:text-indigo-700'
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </header>
  );
}
