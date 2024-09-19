import React from "react";

function Card() {
    const data = [
        {heading:"triming the video"},
        {heading:"triming the video"},
        {heading:"triming the video"},
        {heading:"triming the video"},
        {heading:"triming the video"},
    ]
  return (
      <>
         
          {data.map((items, ind) => (
              <div key={ind} className={ind %2==0?` card w-full h-80 rounded-md shadow-xl overflow-hidden shadow-slate-400  flex items-center justify-between mt-5 mb-20`:` card w-full h-80 rounded-md shadow-xl overflow-hidden shadow-slate-400  flex flex-row-reverse items-center justify-between mt-5 mb-20` }>
                  <div className="left w-[40%] h-full ">
                    <div className="upper w-full h-[30%]  px-5">
                          <h1 className="text-8xl font-ala text-[#2664EF] ">{ ind+1}</h1>
                    </div>
                    <div className="lower w-full h-[70%]  px-5 gap-5 flex flex-col ">
                      <h1 className="font-ala text-4xl font-semibold ">
                        Trimming the video
                      </h1>
                      <p className="font-ala text-xl font-medium opacity-70">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
                        deserunt necessitatibus reiciendis sequi quae enim nam iure error
                        reprehenderit amet magni sapiente, praesentium id labore corporis
                        quod libero veritatis minus.
                      </p>
                    </div>
                  </div>
                  <div className="right w-[60%] h-full  py-2 px-14">
                    <div className="image_container w-full h-full bg-orange-500"></div>
                  </div>
                </div>
          ))}
      </>
  );
}

export default Card;
