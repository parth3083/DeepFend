import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
import connectDb from "./config/dbConnection";
import userRegistration from "./routes/userRegister";
import videoProcessor from "./routes/videoProcessing";



connectDb();

app.get("/", videoProcessor);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
