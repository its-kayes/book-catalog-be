import { Model } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    genre: string;
    publication: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type BookModel = Model<IBook, Record<string, unknown>>;