import { Model } from "mongoose";

export interface IReview {
  username: string;
  book: string;
  review: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReviewModel = Model<IReview, Record<string, unknown>>;
