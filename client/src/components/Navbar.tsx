import Link from "next/link";
import React from "react";
import Button from "./Button";

function Navbar() {
  return (
    <nav className="w-full overflow-hidden font-ala h-10 md:h-12 lg:h-12  flex items-center px-3 lg:px-40 justify-between shadow-md shadow-slate-500 ">
      <div className="left w-1/4">
        <h1 className="text-xl md:text-2xl lg:text-3xl  ">DeepDetect</h1>
      </div>
      <div className="right  flex items-center gap-3 lg:gap-10 justify-between">
        <Link
          href={"#"}
          className="text-xl md:text-2xl lg:text-3xl cursor-pointer"
        >
          Sign in
        </Link>
        <Button children={"Get Started"} />
      </div>
    </nav>
  );
}

export default Navbar;
