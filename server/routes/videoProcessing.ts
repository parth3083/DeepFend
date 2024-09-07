import express, { Request, Response } from "express";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const videoProcessor = async (req: Request, res: Response) => {
  const videoFolder = path.join(__dirname, "../assets");
  
  try {
    const videoFiles = fs
      .readdirSync(videoFolder)
      .filter(
        (file) =>
          file.endsWith(".mp4") || file.endsWith(".avi") || file.endsWith(".mkv")
      );

    if (videoFiles.length !== 1) {
      return res
        .status(400)
        .json({ message: "Please upload exactly one video file." });
    }

    const videoFile = videoFiles[0];
    const videoFilePath = path.join(videoFolder, videoFile);
    const videoFileExtension = path.extname(videoFile);


    const pythonProcess = spawn("python", ["./utils/videoDurationFinder.py", videoFilePath]);

    let output = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });


    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python error: ${data.toString()}`);
    });


    pythonProcess.on("close", (code) => {
      if (code === 0) {
        const videoDuration = output.trim();
        console.log(`Video duration: ${videoDuration}`);
        console.log(`Video Extension: ${videoFileExtension}`);

        fs.unlink(videoFilePath, (err) => {
          if (err) {
            console.error("Error deleting video file:", err);
            return res.status(500).json({ message: "Error deleting video file" });
          }
          console.log("Video file deleted successfully.");
          res.status(200).json({
            duration: videoDuration,
            extension: videoFileExtension,
          });
        });
      } else {
        console.log("Failed in processing the video");
        res.status(500).json({ message: "Failed in processing the video" });
      }
    });
  } catch (err) {
    console.error("Error reading video files:", err);
    res.status(500).json({ message: "Error reading video files" });
  }
};

export default videoProcessor;
