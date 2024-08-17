import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Student from "../models/StudentModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  if (role === "admin") {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.json({ message: "admin not registered" });
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.json({ message: "Password is incorrcet" });
    }
    const token = jwt.sign(
      { username: admin.username, role: "admin" },
      process.env.aadmin_key
    );
    res.cookie("token", token, { httpOnly: true, secure: true }, "3d");
    return res.json({ login: true, role: "admin" });
  } else if (role === "student") {
    const student = await Student.findOne({ username });
    if (!student) {
      return res.json({ message: "student not registered" });
    }
    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return res.json({ message: "Password is incorrcet" });
    }
    const token = jwt.sign(
      { username: student.username, role: "student" },
      process.env.student_key
    );
    res.cookie("token", token, { httpOnly: true, secure: true }, "3d");
    return res.json({ login: true, role: "student" });
  } else {
  }
});

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Admin" });
  } else {
    jwt.verify(token, process.env.aadmin_key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};


const verifyStudent = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid User" });
  } else {
    jwt.verify(token, process.env.aadmin_key, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.student_key, (err, decoded) => {
          if (err) {
            return res.json({ message: "Invalid token" });
          } else {
            req.username = decoded.username;
            req.role = decoded.role;
            next();
          }
        });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};
router.get('/verify',verifyStudent,(req,res)=>{
 return res.json({login:true,role:req.role})
})
router.get('/logout',(req,res)=>{
  res.clearCookie('token')
  return res.json({logout:true,message:"Logout Successful"})
})
export { router as AdminRouter, verifyAdmin };
