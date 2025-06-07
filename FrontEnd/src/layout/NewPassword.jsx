import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Both fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/reset_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ new_password: password })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Password successfully reset!');
        navigate('/login');
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (error) {
      setError('Server error.');
    }
  };

  return (
    <div className="relative z-10 bg-black bg-opacity-5 rounded-3xl shadow-3xl p-20 w-[500px] 
        top-20 mx-auto backdrop-blur-lg border border-black border-opacity-40">

      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">New Password</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Enter New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            id="showPassword"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-900">
            Show Password
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
