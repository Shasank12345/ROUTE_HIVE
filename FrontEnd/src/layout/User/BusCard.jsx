import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

export default function BusCard() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    role: '',
    pickuplocation: '',
    school: '',
    Bus_Name: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/get_profile', {
          credentials: 'include',
        });

        const data = await res.json();

        if (res.ok && data) {
          setFormData({
            fullname: data.fullname,
            email: data.email,
            phonenumber: data.phonenumber,
            role: data.role,
            pickuplocation: data.pickuplocation,
            school: data.school,
            Bus_Name: data.Bus_Name,
          });
        } else {
          console.error('Error fetching profile:', data.message || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[700px] px-2">
      <div className="backdrop-blur-sm border border-purple-300 bg-white/70 shadow-2xl rounded-2xl p-8 max-w-sm w-full transition-transform transform hover:scale-105">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-tr from-purple-300 to-yellow-300 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
            <User size={32} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center text-purple-800 mb-2">
          {formData.fullname || 'No Name'}
        </h3>
        <hr className="mb-4 border-purple-300" />

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Phone:</strong> {formData.phonenumber || 'N/A'}</p>
          <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
          <p><strong>Role:</strong> {formData.role || 'N/A'}</p>
          <p><strong>Pickup Location:</strong> {formData.pickuplocation || 'N/A'}</p>
          <p><strong>School:</strong> {formData.school || 'N/A'}</p>
          <p><strong>Bus Name:</strong> {formData.Bus_Name || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
