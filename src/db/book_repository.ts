import { Book, BookDTO } from "./db";

export const addBook = (title: string, userId: string) => {
  const book = new Book({ name: title, owners: [userId] });

  return book.save();
};

export const getBookList = () => {
  return Book.find()
    .lean()
    .exec()
    .then((books) => {
      return books as BookDTO[];
    });
};

export const removeBook = (id: string) => {
  return Book.findByIdAndRemove({ _id: id }).exec();
};
