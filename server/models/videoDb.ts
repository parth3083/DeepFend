import mongoose, { Schema, Document, Model } from "mongoose";

interface videoDetails extends Document {
  userId: string;

  videoUrl: string;
  metadata: {
    duration: number;
    format: string;
    title: string;
    size: string;
    source: string;
    bitrate: string;
  };

  finalClass: string;
  finalProbability: string;

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
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    bitrate: {
      type: String,
      required: true,
    },
  },


  finalClass: {
    type: String,
    required: true,
  },
  finalProbability: {
    type: String,
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
