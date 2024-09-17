import mongoose, { Schema, Document, Model } from "mongoose";

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
  subscription: { type: String, required: true, default: "free" },
  createdAt: { type: Date, default: Date.now },
});

const UserModel: Model<UserDetails> = mongoose.model<UserDetails>(
  "User",
  userSchema
);
export default UserModel;
