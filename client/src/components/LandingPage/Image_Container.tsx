import React from 'react'
import image1 from "../../app/assets/landing.jpg"
import Image from 'next/image'

function Image_Container({className}:{className?:string}) {
  return (
    <div className={`w-[80vw] md:w-[65vw] md:h-[65vw] lg:w-[50vw] h-[80vw] lg:h-[45vw] p-5 rounded-md bg-white shadow-lg shadow-slate-400 mt-10 image_conatiner `}>
      <div className="w-full h-full rounded-md bg-blue-500">
        <Image src={image1} width={300} height={ 300} alt='image' className='w-full h-full object-cover' />
    </div>
  </div>
  )
}

export default Image_Container