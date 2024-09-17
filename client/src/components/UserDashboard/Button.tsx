import React, { ReactNode } from "react";
import { LuUploadCloud } from "react-icons/lu";


interface UploadPopupProps {
  uploadPopup: boolean;
  setUploadPopup: (value: boolean) => void;
  children: ReactNode;
}

function Button({ children,uploadPopup, setUploadPopup }: UploadPopupProps) {
  return (
    <div
      onClick={()=>setUploadPopup(true)}
      className={`lg:px-3 w-fit px-1 py-2  cursor-pointer rounded-md bg-[#2664EF] gap-3 capitalize text-xl md:text-2xl lg:text-2xl font-semibold font-ala text-white flex items-center `}
    >
      <LuUploadCloud />
      {children}
    </div>
  );
}

export default Button;
