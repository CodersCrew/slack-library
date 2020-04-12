import { Book, BookDTO } from "./db";
import { createObjectId } from "../utils/db_utils";

export const addBook = (title: string, userId: string) => {
  const book = new Book({ name: title, owners: [userId], createdBy: userId });

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

export const removeBook = (id: string, ownerId: string) => {
  return Book.findOneAndRemove({
    _id: createObjectId(id),
    createdBy: ownerId,
  }).exec();
};
