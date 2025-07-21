import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Respond2() {
  const { state: entry } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const isDriver = !!entry.preferred_route;

  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        isDriver ? 'http://localhost:5000/enroll/accepted' : 'http://localhost:5000/enroll/accept',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: entry.email }),
        }
      );

      const result = await res.json();
      alert(result.message || 'Accepted!');
      navigate('/admindashboard/respond1');
    } catch (err) {
      console.error(err);
      alert('Error during acceptance.');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        isDriver ? 'http://localhost:5000/enroll/rejected' : 'http://localhost:5000/enroll/reject',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: entry.email }),
        }
      );

      const result = await res.json();
      alert(result.message || 'Rejected.');
      navigate('/admindashboard/respond1');
    } catch (err) {
      console.error(err);
      alert('Error during rejection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-[60px]">
      <div className="border p-6 shadow-lg w-full sm:w-[45%] md:w-[40%] max-w-[400px] rounded-lg bg-gradient-to-br from-purple-50 to-yellow-50">
        <h2 className="text-xl font-semibold text-center mb-6">{isDriver ? "Driver Details" : "User Details"}</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name:
            <input
              type="text"
              value={entry.fullname || entry.Full_Name || ''}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </label>
        </div>

        {/* Email */}
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

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number:
            <input
              type="text"
              value={entry.phonenumber || entry.phone_num || ''}
              readOnly
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </label>
        </div>

        {/* Conditional fields */}
        {isDriver ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Preferred Route:
              <input
                type="text"
                value={entry.preferred_route || ''}
                readOnly
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </label>
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Accept & Reject Buttons */}
        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={handleAccept}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
