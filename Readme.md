# MERN Stack User Authentication Application

This is a user authentication application built with the MERN (MongoDB, Express, React, Node.js) stack. It uses access tokens and refresh tokens for secure authentication. The access token expires in 15 minutes, and the refresh token expires in 1 hour. When the access token expires, a new access token is generated using the refresh token. If the refresh token expires, the user is logged out.

## Features

- User registration and login
- Password hashing using bcryptjs
- JWT-based authentication
- Access token and refresh token implementation
- Auto-refreshing of access tokens
- Protected routes in the frontend
- Logout functionality

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- bcryptjs
- jsonwebtoken
- dotenv
- cookie-parser
- axios
- react-router-dom

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mern-auth-app.git
   cd mern-auth-app


   ```

2. Install server dependencies:

   ```
   cd server
   npm install

   ```

3. Install client dependencies:

   cd client
   npm install
   Create a .env file in the root directory and add the following environment variables:

4. env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   Running the Application
5. Start the backend server:

   cd server
   nodemon index.js

6. Start the frontend development server:

   cd client
   npm start

7. Project Structure
   mern-auth-app/
   ├── client/
   │ ├── src/
   │ │ ├── components/
   │ │ │ └── ProtectedRoute.js
   │ │ ├── context/
   │ │ │ └── AuthContext.js
   │ │ ├── pages/
   │ │ │ ├── Home.js
   │ │ │ └── Login.js
   │ │ ├── App.js
   │ │ └── index.js
   │ ├── public/
   │ └── package.json
   ├── config/
   ├── controllers/
   │ └── authController.js
   ├── middleware/
   │ └── authMiddleware.js
   ├── models/
   │ └── User.js
   ├── routes/
   │ └── auth.js
   ├── .env
   ├── server.js
   └── package.json

8. Endpoints
   POST /api/signup - Register a new user
   POST /api/login - Login a user and return access and refresh tokens
   POST /api/logout - Logout a user and clear refresh token
   GET /api/user - Fetch user
   GET /api/refresh - Refresh the access token using the refresh token
