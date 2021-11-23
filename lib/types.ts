import { isValidObjectId, Types } from "mongoose";

import { IBook } from "./models/book";

export interface UserExtension {
  count_reading_books: number,
  count_finished_books: number,
  count_planning_books: number,
  count_dropped_books: number,
}

export function isID(id: any): boolean {
  return id != undefined
    && id != null
    && typeof id === "number"
    && Number.isInteger(id);
}

export function parseID(id: any): Types.ObjectId {
  if (!isValidObjectId(id)) {
    throw "Invalid Id";
  }
  return Types.ObjectId(id);
}

export function isToken(id: any): boolean {
  // TODO Actual check
  return id != undefined
    && id != null
    && typeof id === "string";
}

export function createSerializableBookInfo(book: IBook): any {
  const { start_date, end_date } = book;

  return { ...book, start_date: start_date && start_date.toISOString(), end_date: end_date && end_date.toISOString() };
}