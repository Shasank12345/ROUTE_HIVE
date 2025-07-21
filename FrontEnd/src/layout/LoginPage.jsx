import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMsg] = useState('');

  const navigate = useNavigate();
  const togglePassword = () => setShowPassword(!showPassword);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const login = async () => {
    if (!email || !password) {
      setErrorMsg('Email and Password are required.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setMsg('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', 
      });

      const data = await response.json();

      if (data.type === 'admin') {
        setMsg(data.message || 'Login successful');
        navigate('/AdminDashboard');
      } else if (data.type === 'user') {
        setMsg(data.message || 'Login successful');
        navigate('/UserDashboard'); 
      } else if (data.type === 'driver') {
        setMsg(data.message || 'Login successful');
        navigate('/DriverDashboard');
      } else {
        setErrorMsg(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMsg('Failed to connect to server');
    }
  };

  const onforgot = () => navigate('/forgot');

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20220522/pngtree-tourist-express-bus-rides-on-the-road-against-the-backdrop-of-image_1385295.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />

      <div className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-xl p-10 w-full max-w-md border border-white/20">
        <h2 className="text-center text-3xl font-semibold text-white mb-6 drop-shadow-md">
          Login
        </h2>

        {errorMsg && (
          <p className="text-red-300 text-sm text-center mb-4">{errorMsg}</p>
        )}

        {message && (
          <p className="text-green-300 text-sm text-center mb-4">{message}</p>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg('');
                setMsg('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg('');
                setMsg('');
              }}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-3 text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <button
              onClick={onforgot}
              className="text-sm text-purple-300 hover:text-purple-100 transition"
              type="button"
            >
              Forgot Password?
            </button>
          </div>

          <button
            onClick={login}
            className="w-full py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition shadow-md"
            type="button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
