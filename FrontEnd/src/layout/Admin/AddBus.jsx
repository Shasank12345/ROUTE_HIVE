import React, { useState, useEffect } from 'react';

export default function AddBus() {
  const [formData, setFormData] = useState({
    busName: '',
    busNumber: '',
    driverEmail: '',
    driverContact: '',
    busRoute: '',
  });

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch('http://localhost:5000/driver', {
          method: 'GET',
        });
        const data = await res.json();
        setDrivers(data);
      } catch (err) {
        console.error('Error fetching drivers:', err);
      }
    };

    fetchDrivers();
  }, []);

  const handleDriverChange = (e) => {
    const selectedEmail = e.target.value;
    const selectedDriver = drivers.find((d) => d.email === selectedEmail);

    setFormData((prev) => ({
      ...prev,
      driverEmail: selectedEmail,
      driverContact: selectedDriver?.phone || '',
      busRoute: selectedDriver?.preferred_route || '',
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/add_bus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(' Bus added successfully!');
        console.log(data);
        // Reset form
        setFormData({
          busName: '',
          busNumber: '',
          driverEmail: '',
          driverContact: '',
          busRoute: '',
        });
      } else {
        alert(' Error: ' + (data.error || 'Failed to add bus'));
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md bg-gradient-to-br from-yellow-90 to-purple-90"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Bus</h2>

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
          <label className="block font-semibold text-gray-700 mb-1">Select Driver</label>
          <select
            name="driverEmail"
            value={formData.driverEmail}
            onChange={handleDriverChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">-- Select Driver --</option>
            {drivers.map((driver, index) => (
              <option key={index} value={driver.email}>
                {driver.name} ({driver.email})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">Driver Contact</label>
          <input
            type="tel"
            name="driverContact"
            value={formData.driverContact}
            readOnly
            className="w-full border rounded px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-1">Bus Route</label>
          <input
            type="text"
            name="busRoute"
            value={formData.busRoute}
            readOnly
            className="w-full border rounded px-4 py-2 bg-gray-100"
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
