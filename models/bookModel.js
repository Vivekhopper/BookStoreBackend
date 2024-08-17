import mongoose from "mongoose";
// Define the schema for the Book
const bookSchema = new mongoose.Schema(
  {
    bookname: {
      type: String,
      required: true,
      trim: true,
    },
    authorname: {
      type: String,
      required: true,
      trim: true,
    },
    imageurl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the model from the schema
const Book = mongoose.model("Book", bookSchema);
export default Book;
