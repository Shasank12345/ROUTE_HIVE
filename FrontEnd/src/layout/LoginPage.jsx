import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const validateEmail = (email) => {
    // Simple email regex
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const login = async () => {
    // Basic validation
    if (!email && !password) {
      setErrorMsg('Email and Password are required.');
      return;
    }

     else if (!email) {
      setErrorMsg('Email is required.');
      return;
    }

    else if (!password) {
      setErrorMsg('Password is required.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // If everything is valid, clear error and proceed
    setErrorMsg('');
    try{
      const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login sucessful');
      //navigate('/verify');
    } else {
      setErrorMsg(data.message || 'Login failed');
    }
    } catch (error) {
        setErrorMsg('Failed to connect to server');

      }
   
  };

  const onforgot = () => {
    navigate('/forgot');
  };

  return (
    <div>
      <div className="relative z-10 bg-black bg-opacity-5 rounded-3xl shadow-3xl p-20 w-[500px] 
          top-20 mx-auto backdrop-blur-lg border border-black border-opacity-40">
        <h2 className="text-center text-3xl font-bold text-black mb-4">Login</h2>

        {errorMsg && (
          <p className="text-red-600 text-sm text-center mb-4">{errorMsg}</p>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-8 relative">
            <input
              className="w-full p-3 rounded-lg bg-black bg-opacity-20 text-black placeholder-black focus:outline-none 
              focus:ring-2 focus:ring-purple-400"
              type="email"
              id="username"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <input
              className="w-full p-3 pr-10 rounded-lg bg-black bg-opacity-20 text-black placeholder-black focus:outline-none 
              focus:ring-2 focus:ring-purple-400"
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-3 text-black opacity-50 hover:opacity-80"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="mb-2 text-right">
            <button
              type="button"
              onClick={onforgot}
              className="text-sm text-black-300 hover:text-black-100 transition"
            >
              Forgot Password?
            </button>
          </div>
          <div>
            <button
              onClick={login}
              type="submit"
              className="w-full py-5 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
