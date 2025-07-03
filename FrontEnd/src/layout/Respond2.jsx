import React from 'react'

export default function Respond2() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative group border p-6 shadow-lg w-full sm:w-[45%] md:w-[40%] max-w-[400px] rounded-lg bg-white bg-gradient-to-br from-purple-50 to-yellow-50">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name:
            <input
              id="fullname"
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
            <input
              id="emailaddress"
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
           Phone Number:
            <input
              id="phonenumber"
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Pickup Address:
            <input
              id="pickupaddress"
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Role:
            <input
              id="role"
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            School/Branch:
            <input
              id="school"
              type="text"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>
       <div className="flex gap-4 mt-4 justify-center">
         <button  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
              >
                Accept
              </button>
                <button  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Reject
              </button>
       </div>
      </div>
    </div>
  )
}
