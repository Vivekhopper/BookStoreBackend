import express from "express"
import dotenv from "dotenv"
import "./db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { AdminRouter } from "./Routes/auth.js"
import { studentRouter } from "./Routes/student.js"
import { addbook } from "./Routes/book.js"
import Book from "./models/bookModel.js";
import Student from "./models/StudentModel.js";
import Admin from "./models/Admin.js";

const app=express();
dotenv.config();
app.use(express.json())
app.use(cors({
        origin:['http://localhost:5173'],
        credentials:true
}))
app.use(cookieParser())
app.use('/auth',AdminRouter)
app.use('/student',studentRouter)
app.use('/book',addbook)
app.get('/dashboard',async(req,res)=>{
        try{
                const student=await Student.countDocuments();
                const admin=await Admin.countDocuments();
                const book=await Book.countDocuments();
                return res.json({ok:true,student,book,admin});
        }
        catch(err){
                return res.json(err);
        }
})
app.listen((process.env.port),()=>{
        console.log("server running");
})
