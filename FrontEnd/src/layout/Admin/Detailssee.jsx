import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Detailssee() {
  const location = useLocation();
  const navigate = useNavigate();
  const busId = location.state?.busId;
  const busName = location.state?.busName || 'Bus';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!busId) {
      setError('Bus ID not provided. Please go back and try again.');
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/users_by_bus/${busId}`);
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data.users)) {
          throw new Error('Invalid data format from API');
        }
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [busId]);

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>Error: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="p-4 text-center">Loading users...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-purple-700">
        Users Assigned to {busName}
      </h2>

      <table className="w-full border-collapse border border-gray-300 shadow rounded">
        <thead className="bg-purple-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Pickup Location</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-left">School</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-purple-50">
                <td className="border border-gray-300 px-4 py-2">{user.Full_Name || '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email || '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone_num || '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{user.pick_at || '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{user.Role || '-'}</td>
                <td className="border border-gray-300 px-4 py-2">{user.school || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No users assigned to this bus.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Bus List
        </button>
      </div>
    </div>
  );
}
