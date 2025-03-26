import express from "express";
import { auth } from "../../middlewares/auth";
import {
  addMedicineReview,
  getMedicineReviews,
} from "./medicineReview.controller";

const router = express.Router();

router.post("/", auth(), addMedicineReview);
router.get("/:medicineId", getMedicineReviews);

export const medicineReviewRoutes = router;
