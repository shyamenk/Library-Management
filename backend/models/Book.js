import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    availabilityStatus: {
      type: String,
      enum: ["Available", "Borrowed"],
      default: "Available",
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
