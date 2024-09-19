import videoModel from "../models/videoDb";
import UserModel from "../models/userDb";
import { Request, Response } from "express";

const fetchdata = async (req: Request, res: Response) => {
  try {
    const { email } = req.query; 
 
    if (!email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await UserModel.findOne({ userEmail: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userVideos = await videoModel.find({ userId: user._id });
    if (userVideos.length === 0) {
      return res.status(404).json({ message: "No videos found for this user" });
    }

    return res.status(200).json({
      message: "Videos fetched successfully",
      videos: userVideos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" }); // Send a response for server errors
  }
};

export default fetchdata;
