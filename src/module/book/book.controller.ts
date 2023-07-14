import { NextFunction, Request, Response } from "express";
import { throwResponse } from "../../shared/throwResponse";
import catchAsync from "../../util/catchAsync";
import { bookService } from "./book.service";
import AppError from "../../errors/AppError";

const addBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, genre, publication } = req.body;

  if (!title || !author || !genre || !publication) {
    next(new AppError("Please provide all the details", 400))
  }

  const book = await bookService.saveBook(req.body);

  if(!book) {
    next(new AppError("Something went wrong", 500))
  }

  return throwResponse(res, book, 200, "Book added successfully", true);
});

export const bookController = {
  addBook,
};
