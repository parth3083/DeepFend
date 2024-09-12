import React, { ReactNode } from "react";

function Button({ children }: { children: ReactNode }) {
  return (
    <div className="lg:px-3 px-1 py-[0.15vw] cursor-pointer rounded-sm bg-[#2664EF] capitalize text-xl md:text-2xl lg:text-3xl font-ala text-white flex items-center">
      {children}
    </div>
  );
}

export default Button;
