import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Respond1() {
  const [data, setData] = useState(7);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: data }).map((_, index) => (
          <div
            key={index}
            className="relative group border p-6 shadow-lg w-full sm:w-[45%] md:w-[40%] max-w-[400px] rounded-lg bg-gradient-to-br from-purple-70 to-yellow-70"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name:
                <input
                  id={`fullname-${index}`}
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number:
                <input
                  id={`phonenumber-${index}`}
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Pickup Address:
                <input
                  id={`pickupstation-${index}`}
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                />
              </label>
            </div>
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center backdrop-blur-sm rounded-lg z-10">
              <button
                onClick={() => navigate('/admindashboard/respond2')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

    
     
    </div>
  );
}
