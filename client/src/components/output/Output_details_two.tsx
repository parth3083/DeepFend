import React from 'react'

function Output_details_two() {
  return (
    <div className='output_container flex flex-col gap-3 mb-10 overflow-hidden rounded-md shadow-xl shadow-slate-400'>
    <div className='w-full h-12  border-b-2 border-slate-300 flex items-center justify-center'>
    <h1 className='font-ala text-3xl uppercase font-semibold text-center'>details</h1>
    </div>
    <div className='w-full flex flex-col gap-5 '>
      <p className='font-ala text-lg opacity-80 px-7 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident voluptates, expedita doloremque ratione sequi, repudiandae recusandae nobis cupiditate consectetur blanditiis consequuntur hic. </p>
      <div className='w-full h-[100vh]  p-5 border-b-2 border-slate-300'>
        <div className="image_div w-full h-full bg-blue-600 rounded-md overflow-hidden"></div>
      </div>
      <div className='w-full h-[50vh] flex flex-col gap-3 '>
        <div className='w-full'>
        <h1 className='font-ala text-5xl uppercase font-semibold px-5'>model results</h1>
        </div>
        <div className='w-full h-[40vh] flex items-center '>
          <div className="left h-full w-1/2 flex flex-col border-r-2 border-slate-300  gap-5 p-7">
          <h1 className='font-ala text-2xl font-semibold '>DeepFend : <span className='font-normal opacity-70'>Video.mp4</span></h1>
          <h1 className='font-ala text-2xl font-semibold '>DeepFend : <span className='font-normal opacity-70'>Video.mp4</span></h1>
          <h1 className='font-ala text-2xl font-semibold '>DeepFend : <span className='font-normal opacity-70'>Video.mp4</span></h1>

          </div>
          <div className="right h-full w-1/2 flex flex-col  gap-5 p-7">
          <h1 className='font-ala text-2xl font-semibold '>DeepFend : <span className='font-normal opacity-70'>Video.mp4</span></h1>
          <h1 className='font-ala text-2xl font-semibold '>DeepFend : <span className='font-normal opacity-70'>Video.mp4</span></h1>
          <h1 className='font-ala text-2xl font-semibold '>DeepFend : <span className='font-normal opacity-70'>Video.mp4</span></h1>

          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Output_details_two