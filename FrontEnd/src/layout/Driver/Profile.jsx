import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

export default function DriverProfile() {
  const [driverData, setDriverData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/get_profile', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
          if (data.role === 'driver') {
            setDriverData(data);
          } else {
            setError('You are not authorized as a driver');
          }
        } else {
          setError(data.error || 'Failed to fetch driver profile');
        }
      } catch (err) {
        setError('Server error, please try again later.');
      }
    };

    fetchDriverProfile();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!driverData) {
    return <div className="text-center mt-10 text-gray-500">Loading driver profile...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[700px] px-2">
      <div className="backdrop-blur-sm border border-blue-300 bg-white/70 shadow-2xl rounded-2xl p-8 max-w-sm w-full transition-transform transform hover:scale-105">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-400 to-green-300 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
            <User size={32} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-center text-blue-700 mb-2">
          {driverData.fullname || 'No Name'}
        </h3>
        <hr className="mb-4 border-blue-300" />

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Phone:</strong> {driverData.phonenumber || 'N/A'}</p>
          <p><strong>Email:</strong> {driverData.email || 'N/A'}</p>
          <p><strong>Role:</strong> {driverData.role}</p>
          <p><strong>Preferred Route:</strong> {driverData.pickuplocation || 'N/A'}</p>
          <p><strong>Bus Name:</strong> {driverData.Bus_Name || 'Not Assigned'}</p>
        </div>
      </div>
    </div>
  );
}
