import express, { Request, Response } from "express";
import path from "path";
import { spawn } from "child_process";
import upload from "../config/multerConfig";
import UserModel from "../models/userDb";
import videoModel from "../models/videoDb";
import cloudinary from "../config/cloudinary";
import fs from "fs";

const router = express.Router();

router.post(
  "/process-video",
  upload.single("video"),
  async (req: Request, res: Response) => {
    try {
      const {
        startMinute,
        startSecond,
        endMinute,
        endSecond,
        framesPerMinute,
        email,
      } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const userExists = await UserModel.findOne({ userEmail: email });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No video file uploaded" });
      }

      const videoFileName = req.file.filename;
      const videoExtension = path.extname(videoFileName).substring(1);
      const videoFolder = path.join(__dirname, "../uploads");
      const videoFilePath = path.join(videoFolder, req.file.filename);

      console.log("Processing video:", videoFilePath);

      const pythonProcess = spawn("python", ["./utils/main.py", videoFilePath]);

      let pythonOutput = "";

      pythonProcess.stdout.on("data", (data) => {
        pythonOutput += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error(`Python error: ${data}`);
      });

      pythonProcess.on("close", async (code) => {
        console.log(`Python process exited with code ${code}`);

        if (code === 0) {
          try {
            // Ensure only JSON is parsed
            const trimmedOutput = pythonOutput.trim().replace(/^[^{]*(?={)/, ''); // Remove any non-JSON text before the JSON
            const jsonOutput = JSON.parse(trimmedOutput);

        
  

         
            if (!jsonOutput.final_class || !jsonOutput.final_probability || !jsonOutput.metadata ) {
              console.error("Missing fields in Python output:", jsonOutput);
              return res.status(400).json({ message: "Incomplete data from Python script" });
            }

            const finalClass = jsonOutput.final_class;
            const finalProbability = jsonOutput.final_probability;
            const metadata = jsonOutput.metadata;
         

            console.log({
              finalClass,
              finalProbability,
              metadata,
             
            });

            const videoUploadResponse = await cloudinary.uploader.upload(
              videoFilePath,
              { resource_type: "video" }
            );
            const videoUrl = videoUploadResponse.secure_url;
           

            const gifFilePath = path.join(__dirname, "../output/output.gif");

            const gifUploadResponse = await cloudinary.uploader.upload(
              gifFilePath,
              { resource_type: "image" }
            );
            const gifUrl = gifUploadResponse.secure_url;
      

            fs.unlinkSync(videoFilePath);
            fs.unlinkSync(gifFilePath);

            const newVideo = new videoModel({
              userId: userExists._id,
              videoUrl: videoUrl,
              metadata: {
                duration: metadata.duration,
                format: videoExtension,
                title: videoFileName,
                size: metadata.size,
                source: metadata.source,
                bitrate: metadata.bitrate
              },
             
              finalClass: finalClass,
              finalProbability: finalProbability,
          
              outputImage: gifUrl
            });

            await newVideo.save();

            console.log("Video details saved to database");

            res.status(200).json({
              message: "Video processing completed",
              videoDetails: {
                duration: metadata.duration,
                format: videoExtension,
                title: videoFileName,
                size: metadata.size,
                source: metadata.source,
                bitrate: metadata.bitrate,
                
                finalClass,
                finalProbability,
                cloudinaryVideoUrl: videoUrl,
                cloudinaryGifUrl: gifUrl,
              },
            });
          } catch (error) {
            console.error("Error parsing Python output:", error);
            res.status(500).json({ message: "Error parsing Python output" });
          }
        } else {
          res.status(500).json({ message: "Error processing video" });
        }
      });
    } catch (error) {
      console.error("Error processing video:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export { router as videoDetect };
