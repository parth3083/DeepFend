import Link from "next/link";
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
    <Link href={'/userdashboard'}
      className={`lg:px-3 w-fit px-1 py-2 font-semibold ${className} cursor-pointer rounded-md bg-[#2664EF] gap-3 capitalize text-xl md:text-2xl lg:text-3xl font-ala text-white flex items-center`}
    >
      {children}
      <FaArrowRight />
    </Link>
  );
}

export default Button;
