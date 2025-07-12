import React, { useState, useRef, useEffect } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (!resendDisabled) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendDisabled]);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${min}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    setError('');
    setOtp((prev) => ({ ...prev, [name]: value }));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[Object.keys(otp)[index]] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
        className="w-14 h-14 text-2xl text-center rounded-xl mr-4 p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-400 transition shadow-sm"
        autoComplete="off"
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
        setResendDisabled(true);
        setTimeLeft(120);
        setTimeout(() => navigate('/new'), 1000);
      } else {
        setError(data.message || 'Invalid OTP');
        setMessage('');
      }
    } catch {
      setError('Server error. Please try again.');
      setMessage('');
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch('http://localhost:5000/resend_otp', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('OTP resent successfully!');
        setError('');
        setOtp({
          digitOne: '',
          digitTwo: '',
          digitThree: '',
          digitFour: '',
          digitFive: '',
          digitSix: '',
        });
        inputRefs.current[0]?.focus();
        setTimeLeft(120);
        setResendDisabled(true);
      } else {
        setError(data.message || 'Failed to resend OTP');
        setMessage('');
      }
    } catch {
      setError('Server error. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-blue-400 to-gray-100 px-4">
      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 backdrop-blur-sm bg-opacity-70">
        <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-wide">
          Enter OTP
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex mb-8">{renderInput()}</div>

          <div className="w-full flex justify-end mb-6">
            {resendDisabled ? (
              <p className="text-sm text-gray-700">
                Resend OTP in{' '}
                <span className="font-semibold text-purple-700">
                  {formatTime(timeLeft)}
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-sm text-purple-700 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-full transition-shadow shadow-md"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center text-green-600 font-semibold flex items-center justify-center gap-2">
            ✅ {message}
          </p>
        )}

        {error && (
          <p className="mt-6 text-center text-red-600 font-semibold flex items-center justify-center gap-2">
            ❌ {error}
          </p>
        )}
      </div>
    </div>
  );
}
