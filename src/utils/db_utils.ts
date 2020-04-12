import { mongo } from "mongoose";

export const createObjectId = (id: string) => {
  return new mongo.ObjectId(id);
};
