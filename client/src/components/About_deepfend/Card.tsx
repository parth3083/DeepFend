import React from "react";
import image1 from "@/app/assets/step 1.jpg";
import image2 from "@/app/assets/step 2 new.jpg";
import image3 from "@/app/assets/step 3.jpg";
import image4 from "@/app/assets/step 4.jpg";
import image5 from "@/app/assets/step 5.jpg";
import image6 from "@/app/assets/step 6.jpg";
import image7 from "@/app/assets/step 7.jpg";
import image8 from "@/app/assets/step 8.jpg";
import Image from "next/image";

function Card() {
  const data = [
    {
      heading: "triming the video",
      description:
        "The deep fake detection process starts by trimming the input video to focus on the relevant portion, reducing unnecessary sections and length for efficient analysis.",
      image: image1,
    },
    {
      heading: "extract frames",
      description:
        "Trimming a video, breaking it into individual frames for frame-by-frame analysis, helps detect potential manipulation and subtle changes in facial expressions, textures, or inconsistencies.",
      image: image2,
    },
    {
      heading: "face detection",
      description:
        "Face detection algorithms locate and isolate faces within frames, using bounding boxes to focus analysis on critical face areas, ensuring deep fake detection.",
      image: image3,
    },
    {
      heading: "crop bounding boxes",
      description:
        "Bounding boxes detect faces, then crop areas to isolate the face from the rest of the frame, reducing background noise and focusing on facial features for deep fake detection.",
      image: image4,
    },
    {
      heading: "normalized cropped frames",
      description:
        "Crop faces, resize frames, normalize for uniform size and quality, adjust brightness, contrast, and color balance for detection algorithm processing, maintaining consistency across all frames.",
      image: image5,
    },
    {
      heading: "sending frames to model",
      description:
        "Frames are resized and normalized, then processed for analysis by machine learning models. Deep fake detection models use LSTM networks and ConvNext architectures to detect manipulation signs.",
      image: image6,
    },
    {
      heading: "ensembling output of models",
      description:
        "Ensembling combines the strengths of both models to improve the accuracy of deep fake detection by aggregating their outputs.",
      image: image7,
    },
    {
      heading: "creating GIF of labelled frames",
      description:
        "A GIF is created from processed frames, labeling each frame as real or fake, providing a visual representation of the detection process and a quick overview of each frame's assessment.",
      image: image8,
    },
  ];
  return (
    <>
      {data.map((items, ind) => (
        <div
          key={ind}
          className={
            ind % 2 == 0
              ? ` card w-full h-80 rounded-md shadow-xl overflow-hidden shadow-slate-400  flex items-center justify-between mt-5 mb-20`
              : ` card w-full h-80 rounded-md shadow-xl overflow-hidden shadow-slate-400  flex flex-row-reverse items-center justify-between mt-5 mb-20`
          }
        >
          <div className="left w-[40%] h-full ">
            <div className="upper w-full h-[30%]  px-5">
              <h1 className="text-8xl font-ala text-[#2664EF] ">{ind + 1}</h1>
            </div>
            <div className="lower w-full h-[70%]  px-5 gap-4 flex flex-col ">
              <h1 className="font-ala text-4xl capitalize font-semibold ">
                {items.heading}
              </h1>
              <p className="font-ala text-lg font-medium opacity-70">
                {items.description}
              </p>
            </div>
          </div>
          <div className="right w-[60%] h-full  py-4 px-8">
            <div className="image_container w-full h-full bg-orange-500">
              <Image
                src={items.image}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;
