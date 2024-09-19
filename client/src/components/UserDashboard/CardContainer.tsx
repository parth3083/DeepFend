import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios"
import Image from "next/image";



interface deepFakeValues {
  isReal: boolean;
  setIsReal: (value: boolean) => void;
}

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
function CardContainer({ isReal, setIsReal }: deepFakeValues) {
  const [fetchedData, setFetchedData] = useState<VideoDetails[]>([]);
  const { isSignedIn, user } = useUser();  
  const email = user?.emailAddresses[0]?.emailAddress; 

  useEffect(() => {
    if (!isSignedIn) {
      redirect("/");
      return;
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
  }, [isSignedIn, email]);
  return (
    <div className="video-container w-full h-[78vh]  flex flex-col overflow-auto gap-5 items-center  mt-2">
      {fetchedData.length > 0 ? (<>
      
        {fetchedData.map((items) => (
        <div className="video-card w-full h-[70vh] md:h-[50vh] lg:h-56 bg-white shadow-lg shadow-slate-400  p-3 flex-shrink-0  lg:px-14  rounded-md lg:flex-row flex-col flex items-center justify-between">
        <div className="left  w-full md:w-full md:h-[65%] h-1/2 lg:w-[25%] lg:h-full  flex flex-col gap-1 items-center">
              <div className="top w-full h-[80%] ">
                <Image alt="video" src={ items.outputImage} width={56} height={56} className="w-full h-full object-contain" />
          </div>
          <div className="bottom">
                <h1 className="font-ala text-3xl text-[#2664EF]  font-semibold">{ items.metadata.title}</h1>
          </div>
        </div>
        <div className="left w-full h-1/2 lg:w-[65%] md:w-full md:h-[35%] lg:h-full  flex flex-col gap-3 p-2 items-start">
          <h1 className="font-ala text-3xl font-semibold">
                Video Processing length {"( in minutes )"} : <span className=" font-bold text-[#2664EF] ">{ items.metadata.duration} sec</span>
          </h1>
          <h1 className="font-ala text-3xl font-semibold">
            No. of frames (per minute) : <span className=" font-bold text-[#2664EF] ">10</span>
          </h1>
          <h1 className="font-ala text-3xl font-semibold">
                Deep Fake Detect : <span className="capitalize font-bold text-[#2664EF] ">{ items.finalClass}</span>
          </h1>
          <h1 className="font-ala text-3xl font-semibold">
                Size : <span className="capitalize font-bold text-[#2664EF] ">{ items.metadata.size}</span>
          </h1>
        </div>
      </div>
      ))}
      </>) : (<></>)}
    </div>
  );
}

export default CardContainer;
