"use client";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdError } from "react-icons/md";
import Link from "next/link";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import Image from "next/image";
import image1 from "../assets/real.gif"
import image2 from "../assets/fake.gif"


interface Metadata {
  duration: number;
  format: string;
  title: string;
  size: string;
  source: string;
  bitrate: string;
}

interface VideoDetails {
  _id: string;
  userId: string;
  videoUrl: string;
  metadata: Metadata;
  finalClass: string;
  finalProbability: string;
  createdAt: string;
  outputImage: string;
}

function page() {
  const [fetchedData, setFetchedData] = useState<VideoDetails[]>([]);
  const { isSignedIn, user } = useUser();  
  const email = user?.emailAddresses[0]?.emailAddress; 

  useEffect(() => {
    if (!isSignedIn) {
      redirect("/");
      
    }

    async function fetchingDetails() {
      try {
        if (!email) {
          throw new Error("User email not found");
        }

        const response = await axios.get("http://localhost:8000/fetchingDetails", {
          params: { email },
        });

        const videos: VideoDetails[] = response.data.videos; 
        setFetchedData(videos);
      

      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }

    fetchingDetails();
    const intervalId = setInterval(fetchingDetails, 3000);

    
    return () => clearInterval(intervalId);
  }, [isSignedIn, email]);
  return (
    <>
      {fetchedData.length > 0 ? (<>
      
        {fetchedData.map((items) => (
        <main key={items._id} className="w-full min-h-screen pt-20 px-20 flex flex-col gap-12">
        {/* OUTPUT DETAILS ONE  */}
        <div className="output_details w-full h-60 flex flex-col  overflow-hidden rounded-md shadow-xl shadow-slate-400">
        <div className="upper_part w-full h-[25%]  flex items-center justify-between px-8 border-b-2 border-slate-300">
               {items.finalClass=="FAKE"?(<div className="left h-full flex items-center gap-3">
            <MdError className="text-5xl text-red-600" />
            <h1 className="font-ala text-3xl capitalize font-semibold text-red-600">
              deep fake detected !
            </h1>
          </div>):(<div className="left h-full flex items-center gap-3">
            <IoCheckmarkDoneCircleSharp className="text-5xl text-green-600" />
            <h1 className="font-ala text-3xl capitalize font-semibold text-green-600">
              deep fake not detected !
            </h1>
          </div>)}
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
                  <div className="w-full h-full bg-green-500">
                    {items.finalClass == "FAKE" ? (<>
                    <Image src={image2} className="w-full h-full object-cover" alt="fake" />
                    </>) : (<>
                      <Image src={image1} className="w-full h-full object-cover" alt="fake" />
                    </>)}


            </div>
          </div>
          <div className="second h-full flex flex-col gap-9 w-[40%] p-7   border-r-2 border-slate-300">
            <h1 className="font-ala text-2xl font-semibold ">
                    Name : <span className="font-normal opacity-70">{ items.metadata.title}</span>
            </h1>
            <h1 className="font-ala text-2xl font-semibold ">
                    Size : <span className="font-normal opacity-70">{items.metadata.size }</span>
            </h1>
          </div>
          <div className="third h-full w-[40%] flex flex-col gap-9 p-7">
            <h1 className="font-ala text-2xl font-semibold ">
                    User : <span className="font-normal opacity-70">{ items.createdAt}</span>
            </h1>
            <h1 className="font-ala text-2xl font-semibold ">
                    Source : <span className="font-normal opacity-70">{ items.metadata.source}</span>
            </h1>
          </div>
        </div>
      </div>
  
        
        {/* OUTPUT DETAILS TWO  */}
        <div className='output_container flex flex-col gap-3 mb-10 overflow-hidden rounded-md shadow-xl shadow-slate-400'>
      <div className='w-full h-12  border-b-2 border-slate-300 flex items-center justify-center'>
      <h1 className='font-ala text-3xl uppercase font-semibold text-center'>details</h1>
      </div>
      <div className='w-full flex flex-col gap-5 '>
        <p className='font-ala text-lg opacity-80 px-7 text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident voluptates, expedita doloremque ratione sequi, repudiandae recusandae nobis cupiditate consectetur blanditiis consequuntur hic. </p>
        <div className='w-full h-[80vh]  p-5 border-b-2 border-slate-300'>
                  <div className="image_div w-full h-full rounded-md overflow-hidden">
                    <Image src={items.outputImage} alt="output" width={40} height={40} className="w-full h-full object-contain"/>
          </div>
        </div>
        <div className='w-full h-[50vh] flex flex-col gap-3 '>
          <div className='w-full'>
          <h1 className='font-ala text-5xl uppercase font-semibold px-5'>model results</h1>
          </div>
          <div className='w-full h-[40vh] flex items-center '>
            <div className="left h-full w-1/2 flex flex-col border-r-2 border-slate-300  gap-5 p-9">
                      <h1 className='font-ala text-2xl font-semibold '>Final Class : <span className='font-normal opacity-70'>{ items.finalClass}</span></h1>
                      <h1 className='font-ala text-2xl font-semibold '>Final Probability : <span className='font-normal opacity-70'>{ items.finalProbability}</span></h1>
                     
  
            </div>
            <div className="right h-full w-1/2 flex flex-col  gap-5 p-5">
                      <h1 className='font-ala text-2xl font-semibold '>Video name : <span className='font-normal opacity-70'>{ items.metadata.title}</span></h1>
                      <h1 className='font-ala text-2xl font-semibold '>Bit Rate : <span className='font-normal opacity-70'>{ items.metadata.bitrate}</span></h1>
                      <h1 className='font-ala text-2xl font-semibold '>Video Duration : <span className='font-normal opacity-70'>{ items.metadata.duration}</span></h1>
                      <h1 className='font-ala text-2xl font-semibold '>Video Format : <span className='font-normal opacity-70'>{ items.metadata.format}</span></h1>
                      <h1 className='font-ala text-2xl font-semibold '>Video Size : <span className='font-normal opacity-70'>{ items.metadata.size}</span></h1>
            
            </div>
  
          </div>
        </div>
      </div>
    </div>
        </main>
      ))}
      </>) : (
          <div className="w-full z-50 h-screen fixed top-0 left-0 right-0 bottom-0 inset-0 flex items-center justify-center bg-white bg-opacity-50 ">

            <div className="container  relative w-[90%] h-[60%] lg:w-[33vw] flex items-center justify-center p-8 lg:h-[20vw] bg-slate-200 font-ala text-5xl font-semibold">
              Loading....
            </div>
          </div>
    )}
    </>
  );
}

export default page;
