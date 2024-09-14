import React from "react";

function Card() {
  return (
    <div className="video-card w-full h-[70vh] md:h-[50vh] lg:h-56 bg-slate-200 p-3 flex-shrink-0  lg:px-14  rounded-md lg:flex-row flex-col flex items-center justify-between">
      <div className="left w-full md:w-full md:h-[65%] h-1/2 lg:w-[25%] lg:h-full  flex flex-col gap-1 items-center">
        <div className="top w-full h-[80%] bg-amber-600"></div>
        <div className="bottom">
          <h1 className="font-ala text-3xl">Video.mp4</h1>
        </div>
      </div>
      <div className="left w-full h-1/2 lg:w-[65%] md:w-full md:h-[35%] lg:h-full  flex flex-col gap-5 p-7 items-start">
        <h1 className="font-ala text-3xl">
          Video Processing length {"( in minutes )"} : <span>10</span>
        </h1>
        <h1 className="font-ala text-3xl">
          No. of frames : <span>10</span>
        </h1>
        <h1 className="font-ala text-3xl">
          Deep Fake Detect : <span className="capitalize">Real</span>
        </h1>
      </div>
    </div>
  );
}

export default Card;
