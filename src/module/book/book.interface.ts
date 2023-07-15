import { Model, ObjectId } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    genre: string;
    publication: string;
    addedBy: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export type BookModel = Model<IBook, Record<string, unknown>>;

export type BookQueryParams = {
    limit?: string;
    page?: string;
    sortBy?: string;
    sortOrder?: string;
    minPrice?: string;
    maxPrice?: string;
    location?: string;
    searchTerm?: string;
  };
  