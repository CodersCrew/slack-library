import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export interface BookDTO {
  _id: string;
  name: string;
  owners: (string | UserDTO)[];
}

export interface UserDTO {
  real_name: string;
  name: string;
  profile: {
    image_24: string;
  };
}

export const Book = mongoose.model("Books", {
  name: String,
  owners: [String],
} as any);
