import React from 'react'
import image1 from "../../app/assets/parth_new.png"
import image2 from "../../app/assets/masoom_new.png"
import image3 from "../../app/assets/jeet_new.png"
import image4 from "../../app/assets/Pranshu_new.png"
import image5 from "../../app/assets/rutu_ew.png"
import image6 from "../../app/assets/dhyey.png"
import Image from 'next/image'


function Card() {
  const data = [
   {name : "pranshu patel" ,role: "team leader",image:image4},
   {name : "parth rajput" ,role: "developer",image:image1},
   {name : "dhyey shrimankar" ,role: "AI ML Developer",image:image6},
   {name : "masoom patel" ,role: "AI ML Developer",image:image2},
    { name: "jeet bhavsar", role: "UI UX designer", image: image3 },
    { name: "rutu patel", role: "UI UX designer", image: image5 },
   
 ]

  return (
    <>
      {data.map((items) => (
      <div className="card w-[32%] flex-shrink-0  h-full border-2  hover:border-[#2664EF]  border-slate-400  transition-all ease-in-out duration-300 flex flex-col rounded-md">
      <div className="upper w-full h-[50%] flex border-b-2 border-slate-300  py-3 gap-2 items-center flex-col ">
            <div className='w-44 h-44 rounded-full bg-amber-800'>
              <Image alt='name' src={ items.image} className='w-full h-full object-cover' width={150} height={150} />
        </div>
            <h1 className='font-ala text-3xl font-medium capitalize'>{items.name }
           
        </h1>
            <h1 className='font-ala text-xl font-medium capitalize text-[#2664EF] ' >{ items.role}
           
        </h1>
      </div>
      <div className="lower w-full h-[50%]">
        <p className='w-full  font-ala text-lg opacity-70 p-5 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus temporibus qui, facere nisi corporis mollitia fugit consequatur dolore alias voluptatum ducimus eaque placeat tempore excepturi praesentium necessitatibus error numquam molestiae perspiciatis! </p>
      </div>
    </div>
    ))}
    </>
  )
}

export default Card