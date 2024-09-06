import mongoose, { Schema, Document, Model } from "mongoose";
import { z } from "zod";

const videoSchema = z.object({
  userId: z.string(),
  videoUrl: z.string().url({ message: "Enter a valid URL" }),
  uploadDate: z.date(),
  metadata: z.object({
    duration: z
      .number()
      .positive({ message: "Duration must be a positive number" }),
    format: z
      .string()
      .min(3, { message: "Format must be at least 3 characters long" }),
  }),
  status: z.string(),
  isDeepFake: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

interface videoDetails extends Document {
  userId: string;
  videoUrl: string;
  uploadDate: Date;
  metadata: {
    duration: number;
    format: string;
  };
  status: string;
  isDeepFake: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const videoDetailsSchema: Schema<videoDetails> = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  metadata: {
    duration: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
  },
  isDeepFake: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

const videoModel: Model<videoDetails> = mongoose.model<videoDetails>(
  "Video Details",
  videoDetailsSchema
);

export default { videoModel, videoSchema };
