import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMsg('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/forgot_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setErrorMsg('OTP sent to your email.');
        setTimeout(() => {
          navigate('/verify'); 
        }, 1000);
      } else {
        setErrorMsg(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setErrorMsg('Server error. Please try again later.');
    }
  };

  return (
    <div className="relative z-10 bg-black bg-opacity-5 rounded-3xl shadow-3xl p-20 w-[500px] 
        top-20 mx-auto backdrop-blur-lg border border-black border-opacity-40">
      <h2 className="text-center text-3xl font-bold text-black mb-4">Forgot Password</h2>

      {errorMsg && (
        <p className="text-red-600 text-sm text-center mb-4">{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-8 relative">
          <input
            className="w-full p-3 rounded-lg bg-black bg-opacity-20 text-black placeholder-black focus:outline-none 
              focus:ring-2 focus:ring-purple-400"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-2 text-right">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm text-black-300 hover:text-black-100 transition"
          >
            Login!
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-5 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Send OTP
          </button>
        </div>
      </form>
    </div>
  );
}
