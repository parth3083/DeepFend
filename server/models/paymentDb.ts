import mongoose, { Schema, Document, Model } from "mongoose";
import { z } from "zod";

const paymentDetailsSchema = z.object({
  userId: z.string(),
  amount: z.number(),
  currency: z.string(),
  paymentDate: z.date(),
  subscription: z.string(),
  paymentStatus: z.string(),
});

interface paymentSchema extends Document {
  userId: string;
  amount: number;
  currency: string;
  paymentDate: Date;
  subscription: string;
  paymentStatus: string;
}

const paymentSchema: Schema<paymentSchema> = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  subscription: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});

const paymentModel: Model<paymentSchema> = mongoose.model<paymentSchema>(
  "Payment Model",
  paymentSchema
);
export default { paymentModel, paymentDetailsSchema };
