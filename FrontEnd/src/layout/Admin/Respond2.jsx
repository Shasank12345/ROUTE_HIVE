import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Respond2() {
  const { state: entry } = useLocation();

  const handleAccept = async () => {
    try {
      const res = await fetch('http://localhost:5000/enroll/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: entry.email })
      });

      const result = await res.json();
      alert(result.message || 'User accepted!');
    } catch (err) {
      console.error(err);
      alert("Error during acceptance.");
    }
  };

  const handleReject = async () => {
    try {
      const res = await fetch('http://localhost:5000/enroll/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: entry.email })
      });

      const result = await res.json();
      alert(result.message || 'User rejected.');
    } catch (err) {
      console.error(err);
      alert("Error during rejection.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-[60px]">
      <div className="border p-6 shadow-lg w-full sm:w-[45%] md:w-[40%] max-w-[400px] rounded-lg bg-gradient-to-br from-purple-50 to-yellow-50">
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name:
            <input
              type="text"
              value={entry.fullname || ''}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address:
            <input
              type="text"
              value={entry.email || ''}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number:
            <input
              type="text"
              value={entry.phonenumber || ''}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Pickup Address:
            <input
              type="text"
              value={entry.pickupstation || ''}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Role:
            <input
              type="text"
              value={entry.role || ''}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            School/Branch:
            <input
              type="text"
              value={entry.school || ''}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </label>
        </div>

        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={handleAccept}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
