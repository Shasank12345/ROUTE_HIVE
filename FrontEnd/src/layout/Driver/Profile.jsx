import React, { useState } from 'react';
import { User } from 'lucide-react'; 

export default function Profile() {
  const [formData] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    address: '',
    
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/driver_profile')
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-purple-100 to-yellow-100 px-4">
      <div className="backdrop-blur-sm border border-purple-300 bg-white/70 shadow-2xl rounded-2xl p-8 max-w-sm w-full transition-transform transform hover:scale-105">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-tr from-purple-300 to-yellow-300 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
            <User size={42} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center text-purple-800 mb-2">
          {formData.fullname || 'No Name'}
        </h3>
        <hr className="mb-4 border-purple-300" />

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Phone:</strong> {formData.phonenumber || 'N/A'}</p>
          <p><strong>Email:</strong> {formData.email || 'N/A'}</p>
          <p><strong>Address    :</strong> {formData.role || 'N/A'}</p>
         
        </div>
      </div>
    </div>
  );
}
