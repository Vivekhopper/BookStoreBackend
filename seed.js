import bcrypt from 'bcrypt';
import Admin from './models/Admin.js';  // Ensure the path is correct
import './db.js';  // Ensure this file connects to the database

async function AdminAccount() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashPassword = await bcrypt.hash('adminpassword', 10);
      const newAdmin = new Admin({
        username: 'tesla',
        password: hashPassword,
      });
      await newAdmin.save();
      console.log('Account created');
    } else {
      console.log('Account already created');
    }
  } catch (e) {
    console.log(e);
  }
}

AdminAccount();
