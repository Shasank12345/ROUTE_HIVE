import React, { useState } from 'react';

export default function AddBus() {
  const [formData, setFormData] = useState({
    busName: '',
    busNumber: '',
    driverName: '',
    driverContact: '',
    busRoute: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Bus information submitted!');
    console.log(formData);
    // Clear form
    setFormData({
      busName: '',
      busNumber: '',
      driverName: '',
      driverContact: '',
      busRoute: '',
    });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md bg-gradient-to-br from-yellow-90 to-purple-90"
      >
        

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Bus Name</label>
          <input
            type="text"
            name="busName"
            value={formData.busName}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Bus A"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Bus Number</label>
          <input
            type="text"
            name="busNumber"
            value={formData.busNumber}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. BA 2 KHA 4567"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Driver Name</label>
          <input
            type="text"
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Ram Bahadur"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Driver Contact</label>
          <input
            type="tel"
            name="driverContact"
            value={formData.driverContact}
            onChange={handleChange}
            pattern="[0-9]{10}"
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="10-digit mobile number"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-1">Bus Route</label>
          <input
            type="text"
            name="busRoute"
            value={formData.busRoute}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. KU - Koteshwor"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
