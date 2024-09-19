import React from "react";
import Button from "../Button";
import Steps from "./Steps";
import { steps_data } from "@/index";
import Heading_and_Sunheading from "./Heading_and_Sunheading";
import Image_Container from "./Image_Container";

function HeroSection() {
  return (
    <main className="overflow-hidden  pt-10 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <Heading_and_Sunheading
          beforeBrHeading={"stay ahead of deception with"}
          spanHeading={"AI-powered"}
          afterBrheading={"detection"}
          beforeBrdesc={
            "DeepDetect is AI-powered solution to detect and expose deep fakes,ensuring digital"
          }
          afterBrdesc={
            "content authenticity and protecting against misinformation."
          }
        />

        <Button children={"Get Started"} className="mt-8" />
      </div>

      <Image_Container />

      <div className="flex flex-col items-center">
        <Heading_and_Sunheading
          beforeBrHeading={" detect fake in moments"}
          beforeBrdesc={
            "Instant detection has never been easier then with DeepDetect"
          }
          className={"mt-10"}
        />
        <div className="lg:w-[85%] w-full md:w-full px-5  mt-12 md:flex-col flex-col lg:flex lg:flex-row lg:justify-between items-center h-fit ">
          {steps_data.map((items, ind) => (
            <Steps
              key={ind}
              index={ind + 1}
              heading={items.heading}
              desc={items.desc}
            />
          ))}
        </div>
      </div>
     
    </main>
  );
}

export default HeroSection;
