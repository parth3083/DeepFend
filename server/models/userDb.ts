import mongoose, { Schema, Document, Model } from "mongoose";

interface UserDetails extends Document {
  username: string;
  userEmail: string;
  clerk_Id: string;
  createdAt: Date;
}

const userSchema: Schema<UserDetails> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  clerk_Id: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const UserModel: Model<UserDetails> = mongoose.model<UserDetails>(
  "User",
  userSchema
);
export default UserModel;
