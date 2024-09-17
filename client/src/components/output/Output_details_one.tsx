import Link from "next/link";
import React from "react";
import { MdError } from "react-icons/md";

function Output_details_one() {
  return (
    <div className="output_details w-full h-60 flex flex-col  overflow-hidden rounded-md shadow-xl shadow-slate-400">
      <div className="upper_part w-full h-[25%]  flex items-center justify-between px-8 border-b-2 border-slate-300">
        <div className="left h-full flex items-center gap-3">
          <MdError className="text-5xl text-red-600" />
          <h1 className="font-ala text-3xl capitalize font-semibold text-red-600">
            deep fake detected !
          </h1>
        </div>
        <div className="left h-full flex items-center">
          <Link
            href={"/userdashboard"}
            className="px-2 py-1 font-ala text-xl border-2 border-[#2664EF] hover:bg-[#2664EF] text-[#2664EF] font-medium hover:text-white transition-all ease-in-out duration-300 rounded-md"
          >
            Scan more
          </Link>
        </div>
      </div>
      <div className="lower_part flex items-center justify-between p-3 h-[75%]">
        <div className="first h-full w-[20%] p-3 px-6  border-r-2 border-slate-300">
          <div className="w-full h-full bg-green-500"></div>
        </div>
        <div className="second h-full flex flex-col gap-9 w-[40%] p-7   border-r-2 border-slate-300">
          <h1 className="font-ala text-2xl font-semibold ">
            Name : <span className="font-normal opacity-70">Video.mp4</span>
          </h1>
          <h1 className="font-ala text-2xl font-semibold ">
            Size : <span className="font-normal opacity-70">148.2 Mb</span>
          </h1>
        </div>
        <div className="third h-full w-[40%] flex flex-col gap-9 p-7">
          <h1 className="font-ala text-2xl font-semibold ">
            User : <span className="font-normal opacity-70">2021-07-18 </span>
          </h1>
          <h1 className="font-ala text-2xl font-semibold ">
            Source : <span className="font-normal opacity-70">4 years ago</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Output_details_one;
