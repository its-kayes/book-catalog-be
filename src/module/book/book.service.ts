import { ObjectId, SortOrder } from "mongoose";
import { IBook } from "./book.interface";
import { Book } from "./book.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Add book
const saveBook = async (book: any): Promise<IBook | null> => {
  const save = await Book.create({
    title: book.title,
    author: book.author,
    genre: book.genre,
    publication: book.publication,
    addedBy: book.isAuthorized._id,
  });
  return save;
};

// Update book by Id
const updateBookById = async(book: any, id: string): Promise<IBook | null> => {
  const findBook = await Book.findById(id).lean();

  if (!findBook) {
     new AppError("No record found", httpStatus.NOT_FOUND);
     return null;
  }

  const isSameUser = findBook.addedBy.toString() === book.isAuthorized._id.toString();
  if(!isSameUser) {
    new AppError("You are not authorized to perform this action", httpStatus.UNAUTHORIZED);
    return null;
  }

  const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
  return updatedBook;
}

const getBook = async (
  limit: number,
  skip: number,
  whereConditions: object,
  sortConditions: { [key: string]: SortOrder }
) => {
  const books = await Book.find(whereConditions)
    .sort(sortConditions)
    .limit(Number(limit))
    .skip(skip);

  return books;
};

export const bookService = {
  saveBook,
  updateBookById,
  getBook
};
