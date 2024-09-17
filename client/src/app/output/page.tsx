import Navbar from '@/components/UserDashboard/Navbar'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

function page() {
  const { userId } = auth();
  const isAuth = !!userId;
  if (!isAuth) {
    redirect("/");
  }
  return (
      <main className='w-full h-screen'>
          <Navbar />
          <div className='w-full h-[91.5vh]  flex flex-col items-center'>
          <h1 className="font-ala text-2xl lg:text-5xl capitalize mt-5 mb-10">Your Output has been generated</h1>
              <div className='w-[40vw] h-[20vw] bg-green-500'></div>
              <h1 className="font-ala text-2xl lg:text-4xl font-bold capitalize  mt-5 mb-3">Deep Fake : Real (99.99%)</h1>
              <h1 className="font-ala text-2xl lg:text-4xl font-bold capitalize  mb-3">Confidence : 0.235689</h1>
              
              
          </div>
    </main>
  )
}

export default page