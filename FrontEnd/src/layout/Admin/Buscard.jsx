import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import busImage from '../../image/bus2.jpg'; // your bus background image

export default function BusCard() {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/send')
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => setBuses(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleViewDetails = (bus) => {
    // Navigate to the frontend React route where Detailssee component is rendered
    navigate('/admindashboard/detailssee', { state: { busId: bus.id, busName: bus.Bus_Name } });
  };

  // Delete bus and assigned users
  const handleDelete = async (busId) => {
    if (!window.confirm('Are you sure you want to delete this bus and its assigned users?')) return;

    try {
      const res = await fetch(`http://localhost:5000/delete_bus/${busId}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Bus and assigned users deleted!');
        setBuses(prev => prev.filter(bus => bus.id !== busId)); // remove deleted bus from state
      } else {
        const data = await res.json();
        alert('Error: ' + (data.error || 'Failed to delete'));
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="p-4 pt-[60px] bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-center text-purple-800">
        BUS INFORMATION
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {buses.length === 0 ? (
          <p className="text-gray-600">No bus data available.</p>
        ) : (
          buses.map(bus => (
            <div
              key={bus.id}
              className="relative group border border-gray-300 rounded-lg shadow-md max-w-sm w-full p-6 bg-white overflow-hidden"
              style={{ minHeight: '240px' }}
            >
              {/* Blurry background image */}
              <div
                style={{
                  backgroundImage: `url(${busImage})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center bottom',
                  filter: 'blur(6px)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                  pointerEvents: 'none',
                  borderRadius: '0.5rem', // matches rounded-lg
                }}
              ></div>

              {/* Content on top */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 className="text-xl font-bold mb-4 text-center text-purple-700 drop-shadow-sm">
                  {bus.Bus_Name || 'No Name'}
                </h3>
                <p className="mb-1"><strong>Bus Number:</strong> {bus.Bus_Number || 'N/A'}</p>
                <p className="mb-1"><strong>Route:</strong> {bus.Route || 'N/A'}</p>
                <p className="mb-1"><strong>Driver Email:</strong> {bus.Driver_Email || 'N/A'}</p>
                <p className="mb-1"><strong>Driver Phone:</strong> {bus.Driver_Phone || 'N/A'}</p>

                {/* Hover overlay with buttons */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ zIndex: 2 }}
                >
                  <button
                    onClick={() => handleViewDetails(bus)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(bus.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Delete Bus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
