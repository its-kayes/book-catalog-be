import { NextFunction, Request, Response } from "express";
import { throwResponse } from "../../shared/throwResponse";
import catchAsync from "../../util/catchAsync";
import { bookService } from "./book.service";
import AppError from "../../errors/AppError";
import { Book } from "./book.model";
import httpStatus from "http-status";
import { ObjectId, SortOrder } from "mongoose";
import { BookQueryParams } from "./book.interface";

// Add book 
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

// Book Details by id
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

// Delete book
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

// Update book
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

// Get all books
const getBooks = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  const {
    limit = 10,
    page,
    sortBy,
    sortOrder,
    // minPrice,
    // maxPrice,
    // location,
    searchTerm
  } = req.query as BookQueryParams;

  const skip = (Number(page) - 1) * Number(limit) || 0;

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
  }

  const whereConditions: any = {};

  const addWhereCondition = (
    field: string,
    regexOptions: string,
    value: string
  ) => {
    whereConditions[field] = {
      $regex: value,
      $options: regexOptions
    };
  };

  // if (minPrice && maxPrice) {
  //   whereConditions.price = {
  //     $gte: Number(minPrice),
  //     $lte: Number(maxPrice)
  //   };
  // }

  // if (location) {
  //   addWhereCondition('location', 'i', location);
  // }

  if (searchTerm) {
    const searchFields = ['title', 'author', 'genre'];
    whereConditions.$or = searchFields.map(field => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i'
      }
    }));
  }

  const result = await bookService.getBook(
    Number(limit),
    skip,
    whereConditions,
    sortConditions
  );

  const meta = {
    page: Number(page) || 1,
    limit: Number(limit) || 10
  };

  throwResponse(
    res,
    result,
    httpStatus.OK,
    'Book fetched successfully',
    true,
    meta
  );


});
export const bookController = {
  addBook,
  bookDetailsById,
  deleteBook,
  updateBook,
  getBooks
};
