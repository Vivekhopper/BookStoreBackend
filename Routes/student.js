import express from "express";
import Student from "../models/StudentModel.js";
import bcrypt from "bcrypt";
const router = express.Router();
import { verifyAdmin } from "./auth.js";

router.post("/register", verifyAdmin, async (req, res) => {
  try {
    const { rollNo, username, grade, password } = req.body;

    const existingStudent = await Student.findOne({
      $or: [{ username }, { rollNo }],
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Username or Roll No already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new student instance
    const newStudent = new Student({
      rollNo,
      username,
      grade,
      password: hashedPassword,
    });

    // Save the student to the database
    await newStudent.save();

    // Send a success response
    res.status(201).json({ message: "Student registered successfully", registered: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export { router as studentRouter };
