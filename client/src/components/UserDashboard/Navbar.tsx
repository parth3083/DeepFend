import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className="w-full  overflow-hidden font-ala h-10 md:h-12 lg:h-12  flex items-center px-3 lg:px-56 justify-between shadow-md shadow-slate-500 ">
      <div className="left w-1/4">
        <h1 className="text-xl md:text-2xl lg:text-3xl">DeepDetect</h1>
      </div>
      <div className="right flex items-center gap-3 lg:gap-5 justify-between">
              <div className="circle w-9 h-9 rounded-full bg-red-500"></div>
              <h1 className="text-xl md:text-2xl lg:text-3xl capitalize">Parth</h1>
              
      </div>
    </nav>
  )
}

export default Navbar