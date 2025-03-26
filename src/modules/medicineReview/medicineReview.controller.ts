import { Request, Response } from "express";
import mongoose from "mongoose";
import { Medicine } from "../medicine/medicine.model";
import { Order } from "../order/order.model";
import { MedicineReview } from "./medicineReview.model";

export const getMedicineReviews = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params;

    // Fetch reviews
    const reviews = await MedicineReview.find({
      medicineId,
    }).populate("userId", "name");

    // Fetch medicine's rating
    const medicine = await Medicine.findById(medicineId).select(
      "averageRating totalReviews"
    );

    res.status(200).json({
      reviews,
      averageRating: medicine?.averageRating || 0,
      totalReviews: medicine?.totalReviews || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// Function to update medicine rating
const updateMedicineRating = async (
  medicineId: string,
  session: mongoose.ClientSession
) => {
  const reviews = await MedicineReview.find({ medicineId }).session(session);
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const totalReviews = reviews?.length;
  const averageRating = totalReviews ? totalRating / totalReviews : 0;

  await Medicine.findByIdAndUpdate(
    medicineId,
    { averageRating, totalReviews },
    { session }
  );
  return { averageRating, totalReviews };
};

// Add a Review with Transaction
export const addMedicineReview = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { medicineId, rating, review } = req.body;
    const userId = req.user?._id;

    // Check if user has purchased the medicine
    const order = await Order.findOne({
      userId,
      "items.medicineId": medicineId,
      paymentStatus: "completed",
      status: { $in: ["pending", "processing", "shipped", "delivered"] },
    }).session(session);

    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "You can only review purchased medicines." });
    }

    // Create new review
    // Check if user has already reviewed this medicine
    const existingReview = await MedicineReview.findOne({
      userId,
      medicineId,
    }).session(session);

    let newReview;
    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.review = review;
      newReview = await existingReview.save({ session });
    } else {
      // Create new review
      newReview = new MedicineReview({
        userId,
        medicineId,
        rating,
        review,
      });
      await newReview.save({ session });
    }

    // Update medicine's average rating
    const { averageRating, totalReviews } = await updateMedicineRating(
      medicineId,
      session
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
      averageRating,
      totalReviews,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
