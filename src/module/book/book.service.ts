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

export const bookService = {
  saveBook,
};
