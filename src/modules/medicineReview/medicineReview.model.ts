import mongoose from "mongoose";
import { IMedicineReview } from "./medicineReview.interface";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

export const MedicineReview = mongoose.model<IMedicineReview>(
  "MedicineReview",
  reviewSchema
);
