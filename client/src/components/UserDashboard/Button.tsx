import React, { ReactNode } from "react";
import { LuUploadCloud } from "react-icons/lu";

function Button({ children }: { children: ReactNode }) {
  return (
    <div
      className={`lg:px-3 w-fit px-1 py-[0.15vw]  cursor-pointer rounded-md bg-[#2664EF] gap-3 capitalize text-xl md:text-2xl lg:text-4xl font-ala text-white flex items-center `}
    >
      <LuUploadCloud />
      {children}
    </div>
  );
}

export default Button;
