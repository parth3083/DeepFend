import Output_details_one from "@/components/output/Output_details_one";
import Output_details_two from "@/components/output/Output_details_two";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

function page() {
  const { userId } = auth();
  const isAuth = !!userId;
  if (!isAuth) {
    redirect("/");
  }
  return (
    <main className="w-full min-h-screen pt-20 px-20 flex flex-col gap-12">
      <Output_details_one />

      <Output_details_two />
    </main>
  );
}

export default page;
