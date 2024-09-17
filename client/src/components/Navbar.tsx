"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";


interface User {
  username: string;
  emailAddresses: { emailAddress: string }[];
  id: string;
}

function Navbar() {
  const { toast } = useToast();
  const { user, isLoaded, isSignedIn } = useUser();

  const userDetails = async (username: string, email: string, clerk_Id: string) => {
    try {
      const response = await axios.post("http://localhost:8000/user-register", {
        username,
        email,
        clerk_Id
      });
      if (response.status === 200) {
        toast({
          description: "User registered successfully",
  
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "An error occurred while registering the user",
      });
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      const username = user.username || "";
      const email = user.emailAddresses[0]?.emailAddress || ""; 
      const clerk_Id = user.id || "";

      if (username && email && clerk_Id) {
        userDetails(username, email, clerk_Id);
      }
    }
  }, [isSignedIn, user]);

  return (
    <nav className="w-full overflow-hidden font-ala h-10 md:h-12 lg:h-12 flex items-center px-3 lg:px-40 justify-between shadow-md shadow-slate-500">
      <div className="left w-1/4">
        <Link
          href={"/"}
          className="text-xl cursor-pointer md:text-2xl lg:text-3xl font-semibold"
        >
          DeepFend
        </Link>
      </div>
      <div className="right flex items-center gap-3 lg:gap-5 justify-between">
        {isLoaded ? (
          isSignedIn ? (
            <>
              <Link
                href={"/userdashboard"}
                className="px-2 py-1 rounded-md text-ala font-normal text-white text-lg cursor-pointer bg-[#2664EF]"
              >
                Profile
              </Link>
              <div className="flex items-center gap-3">
                <UserButton />
                {user?.username}
              </div>
            </>
          ) : (
            <>
              <Link
                href={"/sign-in"}
                className="px-2 py-1 rounded-md text-ala font-normal text-white text-lg cursor-pointer bg-[#2664EF]"
              >
                Sign In
              </Link>
              <Link
                href={"/sign-up"}
                className="px-2 py-1 rounded-md text-ala font-normal text-white text-lg cursor-pointer bg-[#2664EF]"
              >
                Sign Up
              </Link>
            </>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
