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
Validation: Zod for schema validation
Utilities: Custom response handling, query builder, async handler

Project Structure
src/
├── config/
│   └── env.ts                   # Environment variable configuration
├── middleware/
│   ├── checkAuth.middleware.ts  # Authentication middleware
│   ├── checkRole.middleware.ts  # Role-based authorization middleware
│   └── globalErrorHandler.middleware.ts  # Error handling middleware
├── modules/
│   ├── auth/
│   │   ├── authController.ts    # Authentication logic
│   │   ├── authRoute.ts         # Authentication routes
│   │   └── authModel.ts         # Authentication model
│   ├── user/
│   │   ├── userController.ts    # User management logic
│   │   ├── userModel.ts         # User schema
│   │   └── userRoute.ts         # User routes
│   ├── driver/
│   │   ├── driverController.ts  # Driver-specific logic
│   │   ├── driverModel.ts       # Driver schema
│   │   └── driverRoute.ts       # Driver routes
│   ├── ride/
│   │   ├── rideController.ts    # Ride management logic
│   │   ├── rideModel.ts         # Ride schema
│   │   └── rideRoute.ts         # Ride routes
├── types/
│   ├── interfaces/              # TypeScript interface definitions
│   └── customTypes.ts           # Custom TypeScript types
├── utils/
│   ├── asyncHandler.ts          # Async error handling utility
│   ├── jwt.ts                   # JWT creation and verification
│   ├── QueryBuilder.ts          # Search query builder
│   ├── sendResponse.ts          # Custom response utility
│   └── zodSchemaValidation.ts   # Zod schema validation
├── app.ts                       # Main application entry point
├── .env.dev                     # Environment variables template
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration

Installation

Clone the Repository:git clone https://github.com/tipusahil/tipusahil-Backend-Ride-Booking-System.git
cd tipusahil-Backend-Ride-Booking-System


Install Dependencies:npm install


Set Up Environment Variables:
Copy the .env.dev file to .env:cp .env.dev .env


Update .env with your MongoDB URI and JWT secret:MONGO_URI=mongodb://localhost:27017/ride_booking
JWT_SECRET=access_secret_token_dont_share_production_its_sensitive
JWT_REFRESH_SECRET=JWT_REFRESH_SECRET


Live Link: https://backend-ride-booking-system.vercel.app


Run the Application:npm run dev

The API will be available at https://backend-ride-booking-system.vercel.app/api/v1

Usage
Running Locally

Ensure MongoDB is running locally or provide a cloud MongoDB URI.
Start the server in development mode:npm run dev


Access the API at https://backend-ride-booking-system.vercel.app/api/v1

API Endpoints
Authentication

POST  /auth/register - Register a new user (rider or driver).
POST  /auth/login - Login and receive JWT tokens (access and refresh).

Rider Endpoints

POST  /rides/request - Request a new ride with pickup and destination coordinates.
PATCH  /rides/cancel/:id - Cancel a ride (before driver acceptance).
GET  /rides/me - View rider's ride history.

Driver Endpoints

PATCH  /rides/accept/:id - Accept a ride request.
PATCH  /rides/status/:id - Update ride status (e.g., Picked Up, Completed).
GET  /drivers/earnings - View earnings history.
PATCH  /drivers/availability - Toggle online/offline status.

Admin Endpoints

GET  /users - View all users.
PATCH  /drivers/approve/:id - Approve a driver.
PATCH  /users/block/:id - Block/unblock a user.
GET  /rides - View all ride records.

Testing

Use Postman to test endpoints. Manually test or import a Postman collection (if provided).
Include the JWT access token in the Authorization header for protected routes:Authorization: Bearer <jwt_access_token>


Refresh tokens can be used to obtain new access tokens if expired.



Developed by Tipu Sahil.
Built for the Programming Hero Next Level Web Development course.

