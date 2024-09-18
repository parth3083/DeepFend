import React from "react";

function Heading() {
  return (
    <div className="w-full text-center flex flex-col gap-3 ">
      <h1 className="font-ala text-[#2664EF] text-7xl font-bold">DeepFend</h1>
      <p className="text-xl tracking-widest font-medium capitalize opacity-70">
        a deep fake video detector
      </p>
    </div>
  );
}

export default Heading;
