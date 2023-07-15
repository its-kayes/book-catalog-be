import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    book: {
        type: String,
        required: [true, "Book title is required"]
    },
    review: {
        type: String,
        required: [true, "Review is required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be at most 5"]
    }
}, {
    timestamps: true
})

export const Review = model<IReview>("Review", reviewSchema);