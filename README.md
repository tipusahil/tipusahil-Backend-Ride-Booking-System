Ride Booking API
Overview
This project is a secure, scalable, and role-based backend API for a ride booking system, developed as part of the Programming Hero Next Level Web Development course. Inspired by platforms like Uber and Pathao, it enables riders to request rides, drivers to manage ride requests, and admins to oversee the system. Built with Node.js, Express.js, TypeScript, and MongoDB with Mongoose, the API features JWT-based authentication, bcrypt for password hashing, and a modular architecture for maintainability. Additional features like driver ratings, rider feedback, and geo-based driver search enhance the functionality.
Features
General

JWT-based Authentication: Secure user login with JSON Web Tokens.
Role-based Authorization: Three roles (rider, driver, admin) with protected endpoints.
Secure Password Hashing: Passwords hashed using bcrypt for enhanced security.
TypeScript: Ensures type safety and better code maintainability.
Modular Architecture: Organized codebase for scalability and ease of maintenance.

Rider Features

Request a ride with pickup and destination coordinates (latitude/longitude).
Cancel a ride before driver acceptance.
View complete ride history with details.

Driver Features

Accept or reject incoming ride requests.
Update ride status (Requested → Accepted → Picked Up → In Transit → Completed).
View earnings history for completed rides.
Toggle availability status (Online/Offline).

Admin Features

View all users, drivers, and ride records.
Approve or suspend drivers.
Block or unblock user accounts.
Access basic system reports (e.g., total rides, active drivers).

Bonus Features

Driver Ratings: Riders can rate drivers post-ride for quality assurance.
Rider Feedback: Riders can submit feedback for completed rides.
Geo-based Driver Search: Matches ride requests with nearby available drivers using coordinates.

Technology Stack

Backend: Node.js, Express.js, TypeScript
Database: MongoDB with Mongoose
Authentication: JSON Web Token (JWT)
Password Security: bcrypt
Environment Management: dotenv
Testing: Postman for API testing
Deployment: Configured for Render.com

Project Structure
src/
├── config/
│   └── env.ts               # environment Variable  configuration
├── middleware/
│   ├── checkAuth.middleware.ts   # Authentication and role-based authorization
│   └── globalErrorHandler.middleware.ts  # Error handling middleware
│   └── checkRole.middleware.ts  # Check Roles middleware
├── modules/
│   ├── auth/               # Authentication routes and logic
│   ├── user/               # User management (rider, driver, admin)
│   ├── driver/             # Driver-specific routes and logic
│   ├── ride/               # Ride management routes and logic
├── types/
│   └── interfaces            # TypeScript type definitions
│   └── customTypes.ts        # TypeScript type definitions
├── utils/
│   └── zodSchemaValidation.ts     #
│   └── setAuthTokensToCookies.ts  # Utility for async error handling
│   └── sendResponse.ts     #Utility for custom response 
│   └── QueryBuilder.ts     #Utility for search Query
│   └── asyncHandler.ts     #Utility for async error handling
│   └── jwt.ts              # Utility for json web tokens create and verify
├── app.ts                  # Main application entry point
├── .env                    #  environment variables
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration

Installation

Clone the Repository:git clone https://github.com/tipusahil/tipusahil-Backend-Ride-Booking-System.git
cd tipusahil-Backend-Ride-Booking-System


Install Dependencies:npm install


Set Up Environment Variables:
Copy the .env.dev file to .env:cp .env.dev .env


Update .env with your MongoDB URI and JWT secret:MONGO_URI=mongodb://localhost:27017/ride_booking
JWT_SECRET=your_jwt_secret_key
PORT=3000




Run the Application:npm start

The API will be available at http://localhost:5000.

Usage
Running Locally

Ensure MongoDB is running locally or provide a cloud MongoDB URI.
Start the server:npm run dev


Access the API at http://localhost:5000/api/v1

API Endpoints
Authentication

POST /auth/register - Register a new user (rider or driver).
POST /auth/login - Login and receive a JWT token.

Rider Endpoints

POST /rides/request - Request a new ride with pickup and destination coordinates.
PATCH /rides/:id/cancel - Cancel a ride (before driver acceptance).
GET /rides/me - View rider's ride history.

Driver Endpoints

PATCH /rides/:id/accept - Accept a ride request.
PATCH /rides/:id/status - Update ride status (e.g., Picked Up, Completed).
GET /drivers/earnings - View earnings history.
PATCH /drivers/availability - Toggle online/offline status.

Admin Endpoints

GET /users - View all users.
PATCH /drivers/approve/:id - Approve a driver.
PATCH /users/block/:id - Block/unblock a user.
GET /rides - View all ride records.

Testing

Use Postman to test endpoints. Manually test or import a Postman collection (if provided).
Include the JWT token in the Authorization header for protected routes:Authorization: <jwt_refresh_secret_signature>



Contribution

Fork the repository.
Create a new branch:git checkout -b feature/my-feature-name


Commit your changes:git commit -m "Add my feature description"


Push to the branch:git push origin feature/my-feature-name


Create a Pull Request on GitHub.

Developed by Tipu Sahil.
Built for the Programming Hero Next Level Web Development course.
