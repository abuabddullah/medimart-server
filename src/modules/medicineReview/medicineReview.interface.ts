import mongoose from "mongoose";

export interface IMedicineReview extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  medicineId: mongoose.Types.ObjectId;
  rating: number;
  review: string;
}
