import { ObjectId } from "mongoose";
import { IBook } from "./book.interface";
import { Book } from "./book.model";

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

const updateBookById = async(book: IBook, id: string): Promise<IBook | null> => {
  const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
  return updatedBook;
}

export const bookService = {
  saveBook,
  updateBookById
};
