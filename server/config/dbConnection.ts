import mongoose from "mongoose";
require("dotenv").config();

const connectDb = async () => {
  const uri: string | undefined = process.env.MONGO_DB_URI;

  if (!uri) {
    console.error("MongoDB URI is not defined in the environment variables");
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log("Mongo Db connection Successfull 🔥🔥🔥🔥🔥");
  } catch (error) {
    console.log("Data base connection failed");
  }
};

export default connectDb;
