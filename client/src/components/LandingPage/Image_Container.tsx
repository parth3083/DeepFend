import React from 'react'

function Image_Container({className}:{className?:string}) {
  return (
    <div className={`w-[80vw] md:w-[65vw] md:h-[65vw] lg:w-[50vw] h-[80vw] lg:h-[45vw] p-5 rounded-md bg-green-500 mt-10 image_conatiner `}>
    <div className="w-full h-full rounded-md bg-blue-500"></div>
  </div>
  )
}

export default Image_Container