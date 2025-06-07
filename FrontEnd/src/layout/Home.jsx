import React from 'react'

export default function ProjectHome() {
  return (<>
  <div className='relative top-[45px] bg-gray-200 '>
     
  <section class="text-center py-[20px] bg-gradient-to-r from-yellow-100 to-purple-100 h-[150px]  ">
    <h2 class="text-4xl font-bold">FIND YOUR WAY</h2>
    <p class="text-xl mt-[8px]">OWN YOUR TIME</p>
    <p class="text-xl mt-[8px]">FEATURES</p>
  </section>
  <section class="grid grid-cols-2 md:grid-cols-20 gap-[50px] p-[50px]  pb-[20px]">

    <div class="bg-white shadow-lg rounded-3xl p-[50px] text-center w-[500px] h-[250px]   ">
      <img src="https://img.icons8.com/ios-filled/100/bus.png" alt="Bus" class="mx-auto mb-[8px] w-[64px]"/>
      <h3 class="font-semibold text-lg mb-1">Student Enrollment</h3>
      <p class="text-sm text-gray-600">Manage student transport application</p>
    </div>

    <div class="bg-white shadow-lg rounded-3xl p-[50px] text-center w-[500px] h-[250px]">
      <img src="https://img.icons8.com/ios-filled/100/admin-settings-male.png" alt="Admin" class="mx-auto mb-[8px] w-[64px]"/>
      <h3 class="font-semibold text-lg mb-1">Admin Management</h3>
      <p class="text-sm text-gray-600">Handle user roles and permissions</p>
    </div>

  </section>
  <section class="grid grid-cols-2 md:grid-cols-20 gap-[50px] p-[50px] pt-[20px]">
     <div class="bg-white shadow-lg rounded-3xl p-[50px] text-center w-[500px] h-[250px]">
      <img src="https://img.icons8.com/ios-filled/100/map.png" alt="Map" class="mx-auto mb-[8px] w-[64px]"/>
      <h3 class="font-semibold text-lg mb-1">Bus Management</h3>
      <p class="text-sm text-gray-600">Assign buses to specific routes</p>
    </div>

    <div class="bg-white shadow-lg rounded-3xl p-[50px] text-center w-[500px] h-[250px]">
      <img src="https://img.icons8.com/ios-filled/100/appointment-reminders.png" alt="Notification" class="mx-auto mb-[8px] w-[64px]"/>
      <h3 class="font-semibold text-lg mb-[1px]">Notification</h3>
      <p class="text-sm text-gray-600">Send alerts and updates</p>
    </div>
  </section>
  </div>
  </>

  )
}
