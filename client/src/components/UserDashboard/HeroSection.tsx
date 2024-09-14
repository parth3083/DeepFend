import React from "react";
import Button from "./Button";
import CardContainer from "./CardContainer";

function HeroSection() {
  return (
    <main className="w-full h-[91vh] mt-3  px-5 lg:px-24">
      <div className="w-full h-10 lg:h-20   flex items-center justify-between">
        <h1 className="font-ala text-2xl lg:text-5xl capitalize ">my videos</h1>
        <Button children={"Upload"} />
      </div>

      <CardContainer />
    </main>
  );
}

export default HeroSection;
