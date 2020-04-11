import { Book } from "./db";

export const addBook = (title: string, userId: string) => {
  const book = new Book({ name: title, owners: [userId] });

  return book.save();
};

export const getBookList = () => {
  return Book.find().lean();
};

export const removeBook = (id: string) => {
  return Book.findByIdAndRemove({ _id: id }).exec();
};
