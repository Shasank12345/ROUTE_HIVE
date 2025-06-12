import React from 'react'

export default function Home() {
  return (
    <div className="relative pt-8 min-h-screen bg-gray-100 top-[45px]">
      
      {}
      <section className="bg-gradient-to-r from-yellow-100 to-purple-100 py-10">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800">FIND YOUR WAY</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold  text-purple-800">OWN YOUR TIME</h3>
          <br></br>
          <p className="text-2xl font-extrabold  text-black-70/10"> OUR FEATURES INCLUDES </p>
        </div>
      </section>

      {}
      <section className="py-12 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <FeatureCard
          icon="https://img.icons8.com/ios-filled/100/bus.png"
          title="Student Enrollment"
          desc="Manage student transport applications easily."
        />
        <FeatureCard
          icon="https://img.icons8.com/ios-filled/100/admin-settings-male.png"
          title="Admin Management"
          desc="Control user roles, routes, and complaints."
        />
        <FeatureCard
          icon="https://img.icons8.com/ios-filled/100/map.png"
          title="Bus Management"
          desc="Assign and track buses for specific routes."
        />
        <FeatureCard
          icon="https://img.icons8.com/ios-filled/100/appointment-reminders.png"
          title="Notifications"
          desc="Send alerts and arrival updates to users."
        />
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-slate-600 transition duration-300">
    <img src={icon} alt={title} className="mx-auto w-16 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-purple-700">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
)
