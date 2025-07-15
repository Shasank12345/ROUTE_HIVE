import React, { useEffect, useState } from 'react';

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">User Table</h2>
      <table className="w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Phonenumber</th>
            <th className="px-4 py-2 border border-gray-300">Pickupaddress</th>
            <th className="px-4 py-2 border border-gray-300">Role</th>
            <th className="px-4 py-2 border border-gray-300">School</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border border-gray-300">{user.name}</td>
              <td className="px-4 py-2 border border-gray-300">{user.email}</td>
              <td className="px-4 py-2 border border-gray-300">{user.phonenumber}</td>
              <td className="px-4 py-2 border border-gray-300">{user.pickupaddress}</td>
              <td className="px-4 py-2 border border-gray-300">{user.role}</td>
              <td className="px-4 py-2 border border-gray-300">{user.school}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
