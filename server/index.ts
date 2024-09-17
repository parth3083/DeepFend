import express, { Request, Response } from "express";
const app = express();

import connectDb from "./config/dbConnection";
import userRegister from "./routes/userRegistration"
import cors from "cors"
import {videoDetect} from "./routes/videoProcessing"

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}))

connectDb();

app.get("/", (req:Request, res:Response) => {
  res.send("DeepFend backend started working!!!!!")
});

app.post("/user-register", userRegister)
app.use("/deepfake", videoDetect);

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
