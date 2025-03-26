import mongoose from "mongoose";
import type { IMedicine } from "./medicine.interface";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    totalReviews: {
      type: Number,
      required: false,
    },
    averageRating: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      trim: true,
    },
    requiresPrescription: {
      type: Boolean,
      default: false,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Medicine = mongoose.model<IMedicine>("Medicine", medicineSchema);
