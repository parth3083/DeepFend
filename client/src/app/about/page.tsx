import Card from "@/components/About_deepfend/Card";
import Description from "@/components/About_deepfend/Description";
import Heading from "@/components/About_deepfend/Heading";
import Link from "next/link";

import React from "react";

function page() {
  return (
    <div className="w-full min-h-screen pt-20 px-10">
      <Heading />
      <Description />
      <Card />
      <div className=" w-full text-center mb-10">


        <Link href={'/about-us'} className="font-ala text-3xl border-2 cursor-pointer hover:bg-[#2664EF] hover:text-white transition-all ease-in-out duration-300 rounded-md text-[#2664EF] border-[#2664EF] px-3 py-2 ">
        Who created deepFend ? 
        </Link>
      </div>
    </div>
  );
}

export default page;
