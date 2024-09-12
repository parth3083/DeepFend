import React from "react";

function Steps({
  index,
  heading,
  desc,
}: {
  index: number;
  heading: string;
  desc: string;
}) {
  return (
    <div className="h-full flex md:flex-col flex-col lg:items-start items-center gap-3 md:w-full  w-full lg:w-[32%] p-3 border-black border-opacity-75 border-t-2">
      <h4 className="font-ala text-2xl text-[#2664EF]">Step {index}</h4>
      <h1 className="font-ala text-4xl">{heading}</h1>
      <h4 className="font-ala text-lg text-center lg:text-left lg:text-2xl opacity-60">{desc}</h4>
    </div>
  );
}

export default Steps;
