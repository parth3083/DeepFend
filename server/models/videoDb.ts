import mongoose, { Schema, Document, Model } from "mongoose";

interface videoDetails extends Document {
  userId: string;
  videoUrl: string;
  metadata: {
    duration: number;
    format: string;
  };
  confidence: number;
  isDeepFake: boolean;
  frames: number;
  createdAt: Date;
  outputImage: string;
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
  confidence: {
    type: Number,
    required: true,
  },
  frames: {
    type: Number,
    required: true,
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
  outputImage: {
    type: String,
    required: true,
  },
});

const videoModel: Model<videoDetails> = mongoose.model<videoDetails>(
  "Video Details",
  videoDetailsSchema
);

export default videoModel;
