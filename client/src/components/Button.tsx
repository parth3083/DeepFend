import React, { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

function Button({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`lg:px-3 w-fit px-1 py-[0.15vw] ${className} cursor-pointer rounded-md bg-[#2664EF] gap-3 capitalize text-xl md:text-2xl lg:text-3xl font-ala text-white flex items-center`}
    >
      {children}
      <FaArrowRight />
    </div>
  );
}

export default Button;
