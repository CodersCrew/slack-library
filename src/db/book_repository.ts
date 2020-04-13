import { Book, BookDTO } from "./db";
import { createObjectId } from "../utils/db_utils";

export const addBook = (
  {
    title,
    description,
    image,
    amazonURL,
    rating = 0,
  }: {
    title: string;
    description: string;
    image: string;
    rating: number;
    amazonURL: string;
  },
  userId: string,
) => {
  const book = new Book({
    name: title,
    description,
    image,
    rating,
    amazonURL,
    owners: [userId],
    createdBy: userId,
  });

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
