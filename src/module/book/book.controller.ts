import { NextFunction, Request, Response } from "express";
import { throwResponse } from "../../shared/throwResponse";
import catchAsync from "../../util/catchAsync";
import { bookService } from "./book.service";
import AppError from "../../errors/AppError";
import { Book } from "./book.model";
import httpStatus from "http-status";
import { ObjectId } from "mongoose";

const addBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, author, genre, publication } = req.body;

    if (!title || !author || !genre || !publication) {
      next(
        new AppError("Please provide all the details", httpStatus.BAD_REQUEST)
      );
    }

    const book = await bookService.saveBook(req.body);

    if (!book) {
      next(
        new AppError("Something went wrong", httpStatus.INTERNAL_SERVER_ERROR)
      );
    }

    return throwResponse(
      res,
      book,
      httpStatus.OK,
      "Book added successfully",
      true
    );
  }
);

const bookDetailsById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      next(new AppError("Please provide book id", httpStatus.BAD_REQUEST));
    }

    const book = await Book.findById(id);

    if (!book) {
      next(new AppError("No record found", httpStatus.NOT_FOUND));
    }

    return throwResponse(
      res,
      book,
      httpStatus.OK,
      "Book details fetched successfully",
      true
    );
  }
);

const deleteBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      next(new AppError("Please provide book id", httpStatus.BAD_REQUEST));
    }

    const isBookExit = await Book.findById(id).lean();

    if (!isBookExit) {
      return next(new AppError("No record found", httpStatus.NOT_FOUND));
    }

    const isSameUser =
      (isBookExit.addedBy.toString() as string) === req.body.isAuthorized._id;
    if (!isSameUser) {
      return next(
        new AppError(
          "You are not allow to delete this book",
          httpStatus.UNAUTHORIZED
        )
      );
    }

    const drop = await Book.findByIdAndDelete(id);
    if (!drop) {
      return next(
        new AppError("Something went wrong", httpStatus.INTERNAL_SERVER_ERROR)
      );
    }

    return throwResponse(
      res,
      drop,
      httpStatus.OK,
      "Book deleted successfully",
      true
    );
  }
);

const updateBook = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if(!id) {
    next(new AppError("Please provide book id", httpStatus.BAD_REQUEST));
  }

  const update = await bookService.updateBookById(req.body, id);
  if(!update || null) {
    next(new AppError("Something went wrong", httpStatus.INTERNAL_SERVER_ERROR));
  }

  return throwResponse(res, update, httpStatus.OK, "Book updated successfully", true);
});

export const bookController = {
  addBook,
  bookDetailsById,
  deleteBook,
  updateBook
};
