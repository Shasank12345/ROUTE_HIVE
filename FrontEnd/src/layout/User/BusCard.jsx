import React, { useState } from 'react';
import { User } from 'lucide-react'; 

export default function BusCard() {
  const [formData] = useState({
      fullname: '',
      email: '',
      phonenumber: '',
      address: '',
      role: '',
      pickuplocation: '',
      school: '',
      validdate: '',
    });
  
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
            <p><strong>Address:</strong> {formData.address || 'N/A'}</p>
            <p><strong>Role:</strong> {formData.role || 'N/A'}</p>
             <p><strong>Pickup Location    :</strong> {formData.pickuplocation || 'N/A'}</p>
            <p><strong>School:</strong> {formData.school || 'N/A'}</p>
            <p><strong>Valid Date:</strong> {formData.validdate || 'N/A'}</p>
          </div>
        </div>
      </div>
    );
}
