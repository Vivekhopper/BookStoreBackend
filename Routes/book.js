import express from "express";
import Book from "../models/bookModel.js";
const router = express.Router();
import { verifyAdmin } from "./auth.js";

router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { bookname, authorname, imageurl } = req.body;

    // Create a new student instance
    const newbook = new Book({
      bookname,
      authorname,
      imageurl,
    });

    // Save the student to the database
    await newbook.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Book added successfully", registered: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (err) {
    return res.json(err);
  }
});

// Define route for getting a book by ID
router.get('/book/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id); // No need for `{_id: id}`
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(book);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/book/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ success: true, updatedBook ,message:"Updated Successfully"});
  } catch (err) {
    return res.json({ success: false, error: err });
  }
});
router.delete('/delete/:id',async(req,res)=>{
  try {
    const id = req.params.id;
    const updatedBook = await Book.findByIdAndDelete(id, req.body, { new: true });
    return res.json({ deleted: true, updatedBook,message:"Deleted Successfully" });
  } catch (err) {
    return res.json({ deleted: false, error: err });
  }
})

export { router as addbook };
