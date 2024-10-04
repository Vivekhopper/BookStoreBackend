Book Store (MERN Stack) 📚
Welcome to the Book Store application! This full-stack web application is developed using the MERN Stack (MongoDB, Express.js, React, Node.js) and features JWT authentication and role-based access control for admins and students.

Features 🎯
Student Access:

Students can log in using their username and password.
Browse and view personalized book details.
Secure JWT authentication to keep user sessions safe.
Admin Access:

Admins have complete control over the book inventory.
Admins can add, edit, and delete book details.
Admins are responsible for adding students to the system, ensuring a secure user management flow.
Responsive Design:

The application is designed to work on all screen sizes.
Styled using Tailwind CSS for a clean and modern user interface.
Technologies Used 🛠️
Frontend:
React.js
Tailwind CSS (for styling)
Backend:
Node.js
Express.js
MongoDB (as the database)
Mongoose (for data modeling)
JWT (for secure user authentication)
Environment Variables 🔑
Create a .env file in the server directory with the following variables:

plaintext
Copy code
PORT
mongo_uri="your_mongodb_connection_string"
admin_key="your_admin_key"
student_key="your_student_key"

PORT: Defines the port on which the backend server runs (default is 5001).
mongo_uri: MongoDB connection string for the booksStore database.
admin_key: Secret key for admin access.
student_key: Secret key for student access.

Installation and Setup 🚀
Clone this repository:
bash
Copy code
git clone https://github.com/yourusername/bookstore.git
Navigate to the project folder:
bash
Copy code
cd bookstore
Install backend dependencies:
bash
Copy code
cd server
npm install
Install frontend dependencies:
bash
Copy code
cd client
npm install
Create your .env file as mentioned above.

Run the backend server:

bash
Copy code
cd server
npm start
Run the frontend:
bash
Copy code
cd client
npm start
Usage 💻
Students can log in, browse books, and view book details.
Admins can log in, manage the book inventory, and add students to the system.
The app is responsive and works on all devices.
Future Enhancements 🔮
Add search functionality for easier book discovery.
Implement pagination for book lists.
Introduce an order management system for students to place book orders.
Expand user roles for further permissions.
Feedback & Contributions 🤝
Feel free to provide feedback or open issues. Contributions are always welcome! Let's continue improving this Book Store together.

