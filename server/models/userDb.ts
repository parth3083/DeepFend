import mongoose, { Schema, Document, Model } from "mongoose";
import { z } from "zod";

const userDeatilsSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must of the minimum 5 characters long" }),
  userEmail: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be of minimum 6 character" }),
  subscription: z.string(),
  createdAt: z.date(),
});

interface UserDetails extends Document {
  username: string;
  userEmail: string;
  password: string;
  subscription: string;
  createdAt: Date;
}

const userSchema: Schema<UserDetails> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: { type: String, required: true, defaault:"free" },
  createdAt: { type: Date, default: Date.now },
});

const UserModel: Model<UserDetails> = mongoose.model<UserDetails>(
  "User",
  userSchema
);
export default {UserModel,userDeatilsSchema};
