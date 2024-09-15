import React, { useCallback, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Slider } from "@/components/ui/slider";

interface UploadPopupProps {
  uploadPopup: boolean;
  setUploadPopup: (value: boolean) => void;
}

interface TrimData {
  startMinute: number;
  startSecond: number;
  endMinute: number;
  endSecond: number;
}

function UploadPopup({ uploadPopup, setUploadPopup }: UploadPopupProps) {
  const [showTrimPopup, setShowTrimPopup] = useState<boolean>(false);
  const [showSliderPopup, setShowSliderPopup] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [framesPerMinute, setFramesPerMinute] = useState<number>(10);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [trimData, setTrimData] = useState<TrimData | null>(null);
  const { register, handleSubmit } = useForm<TrimData>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file: File = acceptedFiles[0];
    setVideoFile(file);

    const videoElement: HTMLVideoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(file);

    videoElement.onloadedmetadata = () => {
      const duration: number = videoElement.duration;
      setVideoDuration(duration);

      if (duration > 600) {
        setShowTrimPopup(true);
      } else {
        setShowSliderPopup(true);
      }
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    maxFiles: 1,
    maxSize: 600000000, // 600MB
  });

  const handleTrimSubmit = (data: TrimData) => {
    setTrimData(data); // Store the trim data
    setShowTrimPopup(false); // Hide the trim popup
    setShowSliderPopup(true); // Show the frame selection popup
  };

  const handleSliderSubmit = () => {
    if (videoFile && trimData) {
      // Prepare form data
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("startMinute", trimData.startMinute.toString());
      formData.append("startSecond", trimData.startSecond.toString());
      formData.append("endMinute", trimData.endMinute.toString());
      formData.append("endSecond", trimData.endSecond.toString());
      formData.append("framesPerMinute", framesPerMinute.toString());

      // Submit to the backend
      fetch("/api/submit", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setUploadPopup(false); // Close popup after successful submission
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Missing video or trim data");
    }
    setShowSliderPopup(false);
  };

  const handleSliderChange = (e: number[]) => {
    setFramesPerMinute(e[0]);
  };

  return (
    <section
      className={`w-full z-50 h-screen fixed top-0 left-0 right-0 bottom-0 inset-0 flex items-center justify-center bg-white bg-opacity-50 ${
        uploadPopup ? "block" : "hidden"
      }`}
    >
      {!showTrimPopup && !showSliderPopup ? (
        <div className="container relative w-[33vw] flex items-center justify-center p-8 h-[20vw] bg-slate-200">
          <IoClose
            className="absolute top-2 right-2 text-2xl cursor-pointer text-black"
            onClick={() => setUploadPopup(false)}
          />

          <div
            {...getRootProps()}
            className={`w-full h-full bg-white rounded-md flex items-center justify-center cursor-pointer border-2 border-dashed ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <h1 className="font-ala text-xl tracking-wide opacity-80">
                Drop the files here...
              </h1>
            ) : (
              <h1 className="font-ala text-xl tracking-wide opacity-80 text-center w-[70%]">
                <span className="font-bold">Click to Upload</span> or drag and
                drop your video files here
                <br />
                {"(max. 10 minutes, 600MB)"}
              </h1>
            )}
          </div>
        </div>
      ) : showTrimPopup ? (
        <div className="container relative w-[33vw] p-8 bg-white shadow-lg rounded-md">
          <IoClose
            className="absolute top-2 right-2 text-2xl cursor-pointer text-black"
            onClick={() => setShowTrimPopup(false)}
          />
          <h1 className="font-ala text-4xl text-center mb-4">
            Trim your video
          </h1>
          <form onSubmit={handleSubmit(handleTrimSubmit)}>
            <div className="flex items-center flex-col gap-4">
              <div>
                <label className="block font-ala text-lg">Start Time:</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Minutes"
                    className="border p-2 font-ala text-lg rounded"
                    {...register("startMinute", { required: true })}
                  />
                  <input
                    type="number"
                    placeholder="Seconds"
                    className="border p-2 font-ala text-lg rounded"
                    {...register("startSecond", { required: true })}
                  />
                </div>
              </div>
              <div>
                <label className="block font-ala text-lg">End Time:</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Minutes"
                    className="border p-2 font-ala text-lg rounded"
                    {...register("endMinute", { required: true })}
                  />
                  <input
                    type="number"
                    placeholder="Seconds"
                    className="border p-2 font-ala text-lg rounded"
                    {...register("endSecond", { required: true })}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 border-2 border-black transition-all ease-in-out duration-300 hover:bg-black hover:text-white cursor-pointer p-2 mx-auto w-full font-ala text-2xl tracking-wider rounded-lg"
            >
              Trim Video
            </button>
          </form>
        </div>
      ) : showSliderPopup ? (
        <div className="container relative w-[33vw] p-8 bg-white shadow-lg rounded-md">
          <IoClose
            className="absolute top-2 right-2 text-2xl cursor-pointer text-black"
            onClick={() => setShowSliderPopup(false)}
          />
          <h1 className="font-ala text-4xl text-center mb-4">
            Select Frames per Minute
          </h1>
          <div className="flex flex-col items-center gap-4">
            <label className="block font-ala text-lg">
              Frames per Minute: {framesPerMinute}
            </label>
            <Slider
              min={10}
              max={22}
              step={1}
              onValueChange={handleSliderChange}
            />
            <button
              onClick={handleSliderSubmit}
              className="mt-4 border-2 border-black transition-all ease-in-out duration-300 hover:bg-black hover:text-white cursor-pointer p-2 mx-auto w-full font-ala text-2xl tracking-wider rounded-lg"
            >
              Submit Frames
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default UploadPopup;
