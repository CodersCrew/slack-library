import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export interface BookDTO {
  _id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  amazonURL: string;
  owners: (string | UserDTO)[];
  createdBy: string;
}

export interface Book extends BookDTO {
  isCreator: boolean;
}

export interface UserDTO {
  real_name: string;
  name: string;
  profile: {
    image_24: string;
  };
}

const BookSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  rating: Number,
  amazonURL: String,
  owners: [String],
  createdBy: String,
});

export const Book = mongoose.model("Books", BookSchema);
