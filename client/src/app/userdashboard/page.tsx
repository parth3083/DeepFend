import HeroSection from '@/components/UserDashboard/HeroSection'
import Navbar from '@/components/UserDashboard/Navbar'
import React from 'react'

function page() {
  return (
    <div className="w-full overflow-x-hidden min-h-screen ">
      <Navbar />
    <HeroSection/>
    </div>
  )
}

export default page