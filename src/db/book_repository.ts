import { Book } from "./db";

export const addBook = (title: string) => {
  const book = new Book({ title });

  return book.save();
};
