import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const Book = mongoose.model("Books", {
  name: String,
  owners: [String],
} as any);
