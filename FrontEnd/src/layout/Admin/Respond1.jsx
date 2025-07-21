import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Respond1() {
  const [formData, setFormData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/enroll/check')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(d => ({
          id: d.id,
          fullname: d.Full_Name,
          email: d.email,
          phonenumber: d.phone_num,
          pickupstation: d.pick_at,
          role: d.Role,
          school: d.School,
        }));
        setFormData(mappedData);
      })
      .catch(err => console.error('Fetch error', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/enroll/checked')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(d => ({
          id: d.id,
          Full_Name: d.Full_Name,
          email: d.email,
          phone_num: d.phone_num,
          preferred_route: d.preferred_route,
        }));
        setDriverData(mappedData);
      })
      .catch(err => console.error('Fetch error', err));
  }, []);

  return (
    <div className="p-4 pt-[60px]">
      {/* Student/Teacher Data */}
      <h2 className="text-xl font-bold mb-4">USER REQUEST:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mb-10">
        {formData.map((entry) => (
          <div
            key={entry.id}
            className="relative group border p-6 shadow-lg rounded-lg max-w-sm w-full bg-gradient-to-br from-purple-70 to-yellow-70"
          >
            <h3 className="text-lg font-semibold mb-2">{entry.fullname || 'No Name'}</h3>
            <p><strong>Phone:</strong> {entry.phonenumber || 'N/A'}</p>
            <p><strong>Pickup Address:</strong> {entry.pickupstation || 'N/A'}</p>
            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-40 rounded-lg z-10">
              <button
                onClick={() => navigate('/admindashboard/respond2', { state: entry })}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Driver Data */}
      <h2 className="text-xl font-bold mb-4">DRIVER APPLICATION:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {driverData.map((driver) => (
          <div
            key={driver.id}
            className="relative group border p-6 shadow-md rounded-lg max-w-sm w-full bg-gradient-to-br from-purple-70 to-yellow-70"
          >
            <h3 className="text-lg font-semibold mb-2">{driver.Full_Name || 'Unnamed Driver'}</h3>
            <p><strong>Phone:</strong> {driver.phone_num || 'N/A'}</p>
            <p><strong>Preferred Route:</strong> {driver.preferred_route || 'N/A'}</p>
             <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-40 rounded-lg z-10">
              <button
                onClick={() => navigate('/admindashboard/respond2', { state: driver })}
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
