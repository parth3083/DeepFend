import HeroSection from '@/components/UserDashboard/HeroSection'
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'
import React from 'react'

function page() {
  const { userId } = auth();
  const isAuth = !!userId;
  if (!isAuth) {
    redirect("/");
  }
  return (
    <div className="w-full overflow-x-hidden min-h-screen pt-10 ">
    <HeroSection/>
    </div>
  )
}

export default page