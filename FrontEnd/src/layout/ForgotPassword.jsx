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

  const forgot = () => {
    if (!email) {
      setErrorMsg('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    navigate('/isyourprofile');
  };

  const login = () => {
    navigate('/login');
  };

  return (
    <div className="relative z-10 bg-black bg-opacity-5 rounded-3xl shadow-3xl p-20 w-[500px] 
        top-20 mx-auto backdrop-blur-lg border border-black border-opacity-40">
      <h2 className="text-center text-3xl font-bold text-black mb-4">Forgot Password</h2>

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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-2 text-right">
          <button
            type="button"
            onClick={login}
            className="text-sm text-black-300 hover:text-black-100 transition"
          >
            Login!
          </button>
        </div>

        <div>
          <button
            type="submit"
            onClick={forgot}
            className="w-full py-5 bg-purple-600 text-black rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  );
}
