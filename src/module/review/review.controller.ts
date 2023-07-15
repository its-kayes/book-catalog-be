import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Review } from "./review.model";
import { throwResponse } from "../../shared/throwResponse";

const giveReview = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { review, rating, username, book } = req.body;

    if(!review || !rating || !username || !book) {
        next(new AppError("Please provide all the details", httpStatus.BAD_REQUEST));
    }

    const result = await Review.create(req.body);

    if(!result) {
        next(new AppError("Something went wrong", httpStatus.INTERNAL_SERVER_ERROR));
    }

    throwResponse(res, result, httpStatus.OK, "Review added successfully", true);

})

export const reviewController = {
    giveReview
}