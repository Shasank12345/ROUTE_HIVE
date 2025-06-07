import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState({
    digitOne: '',
    digitTwo: '',
    digitThree: '',
    digitFour: '',
    digitFive: '',
    digitSix: '',
  });

  const inputRefs = useRef([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    setOtp((prev) => ({ ...prev, [name]: value }));

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[Object.keys(otp)[index]]) {
      if (index > 0) inputRefs.current[index - 1].focus();
    }
  };

  const renderInput = () =>
    Object.keys(otp).map((key, index) => (
      <input
        key={key}
        type="text"
        name={key}
        maxLength={1}
        value={otp[key]}
        ref={(el) => (inputRefs.current[index] = el)}
        onChange={(e) => handleChange(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        className="w-12 h-12 text-xl text-center rounded-md mr-3 p-3 bg-black bg-opacity-20 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = Object.values(otp).join('');

    try {
      const res = await fetch('http://localhost:5000/verify_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ otp: finalOtp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setError('');
        setTimeout(() => {
          navigate('/new');
        }, 1000);
      } else {
        setError(data.message || 'Invalid OTP');
        setMessage('');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-3xl font-semibold mb-6 text-center text-black">Enter OTP</h3>
        <div className="flex justify-center mb-6">{renderInput()}</div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
