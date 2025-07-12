import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BusCard = ({ bus }) => {
  const navigate = useNavigate();

  const infoFields = [
    { label: 'Bus Number', value: bus.number },
    { label: 'Driver Name', value: bus.driverName },
    { label: 'Contact', value: bus.contact },
    { label: 'Route', value: bus.route }
  ];

  return (
    <div className="relative group border p-6 shadow-lg w-full sm:w-[45%] md:w-[30%] max-w-[350px] rounded-lg bg-gradient-to-br from-blue-50 to-green-50 hover:shadow-xl transition-shadow">
      {/* Header Section */}
      <div className="p-3 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm bg-opacity-90">
        <h3 className="text-xl font-bold text-center text-gray-800">{bus.name}</h3>
      </div>
      
      {/* Information Grid */}
      <div className="space-y-3">
        {infoFields.map((field, index) => (
          <div key={index} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm bg-opacity-90">
            <p className="font-semibold text-gray-700">{field.label}:</p>
            <p className="mt-1 text-gray-600">{field.value || 'Not available'}</p>
          </div>
        ))}
      </div>

      {/* Hover Action */}
      <div className="absolute inset-0 z-10 items-center justify-center hidden rounded-lg group-hover:flex backdrop-blur-[2px] bg-black bg-opacity-10">
        <button
          onClick={() => navigate(bus.buttonLink)}
          className="px-5 py-2 text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          {bus.buttonLabel}
        </button>
      </div>
    </div>
  );
};

const BusDashboard = () => {
  const [data, setData] = useState(5);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Bus Services</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: data }).map((_, index) => {
          const bus = {
            id: index,
            name: '',
            number: '',
            driverName: '',
            contact: '',
            route: '',
            buttonLabel: 'View Details',
            buttonLink: `/bus/${index + 1}`
          };

          return <BusCard key={bus.id} bus={bus} />;
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
