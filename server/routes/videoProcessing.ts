import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import upload from "../config/multerConfig";
import UserModel from "../models/userDb";

const router = express.Router();

router.post("/process-video", upload.single("video"), async (req: Request, res: Response) => {
  try {
    const { startMinute, startSecond, endMinute, endSecond, framesPerMinute, email } = req.body;


    if (!startMinute || !startSecond || !endMinute || !endSecond || !framesPerMinute || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    const userExists = await UserModel.findOne({ userEmail: email });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }


    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const videoFolder = path.join(__dirname, "../uploads");
    const videoFilePath = path.join(videoFolder, req.file.filename);

    console.log("Processing video:", videoFilePath);
    console.log("Trim Data: ", startMinute, startSecond, endMinute, endSecond);
    console.log("Frames Per Minute:", framesPerMinute);
    console.log("User Email:", email);


    res.status(200).json({ message: "Video processing started" });
  } catch (error) {
    console.error("Error processing video:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as videoDetect };




// const videoProcessor = async (req: Request, res: Response) => {
//   const videoFolder = path.join(__dirname, "../assets");
  
//   try {
//     const videoFiles = fs
//       .readdirSync(videoFolder)
//       .filter(
//         (file) =>
//           file.endsWith(".mp4") || file.endsWith(".avi") || file.endsWith(".mkv")
//       );

//     if (videoFiles.length !== 1) {
//       return res
//         .status(400)
//         .json({ message: "Please upload exactly one video file." });
//     }

//     const videoFile = videoFiles[0];
//     const videoFilePath = path.join(videoFolder, videoFile);
//     const videoFileExtension = path.extname(videoFile);


//     const pythonProcess = spawn("python", ["./utils/videoDurationFinder.py", videoFilePath]);

//     let output = "";

//     pythonProcess.stdout.on("data", (data) => {
//       output += data.toString();
//     });


//     pythonProcess.stderr.on("data", (data) => {
//       console.error(`Python error: ${data.toString()}`);
//     });


//     pythonProcess.on("close", (code) => {
//       if (code === 0) {
//         const videoDuration = output.trim();
//         console.log(`Video duration: ${videoDuration}`);
//         console.log(`Video Extension: ${videoFileExtension}`);

//         fs.unlink(videoFilePath, (err) => {
//           if (err) {
//             console.error("Error deleting video file:", err);
//             return res.status(500).json({ message: "Error deleting video file" });
//           }
//           console.log("Video file deleted successfully.");
//           res.status(200).json({
//             duration: videoDuration,
//             extension: videoFileExtension,
//           });
//         });
//       } else {
//         console.log("Failed in processing the video");
//         res.status(500).json({ message: "Failed in processing the video" });
//       }
//     });
//   } catch (err) {
//     console.error("Error reading video files:", err);
//     res.status(500).json({ message: "Error reading video files" });
//   }
// };

// export default videoProcessor;
