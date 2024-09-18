'use client'
import React, { useState } from "react";
import Button from "./Button";
import CardContainer from "./CardContainer";
import UploadPopup from "./UploadPopup";

function HeroSection() {
  const [uploadPopup, setUploadPopup] = useState(false);
  const [isReal, setIsReal] = useState(false);
  console.log(uploadPopup); 
  return (
    <main className="w-full h-[91vh] mt-3  px-5 lg:px-24">
      
      <div className="w-full h-10 lg:h-20   flex items-center justify-between">
        <h1 className="font-ala text-2xl lg:text-5xl capitalize font-bold">my videos</h1>
        <Button
          uploadPopup={uploadPopup} setUploadPopup={ setUploadPopup}
          children={"Upload"}
        />
      </div>
      {uploadPopup && (
        <UploadPopup
          uploadPopup={uploadPopup}
          setUploadPopup={setUploadPopup}
        />
      )}
      <CardContainer isReal={isReal} setIsReal={ setIsReal} />
    </main>
  );
}

export default HeroSection;
