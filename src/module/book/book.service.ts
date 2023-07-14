import { IBook } from "./book.interface";
import { Book } from "./book.model";

const saveBook = async (book: IBook) => {
   const save = await Book.create(book);
   return save;
}

export const bookService = {
    saveBook
}