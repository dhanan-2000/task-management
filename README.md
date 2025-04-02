
# Task Manager API

## Overview
Task Manager API is a backend service that allows users to register, log in, and manage tasks. The API is built using Node.js, Express, MongoDB, and JWT authentication.

## Features
- User Registration and Login with JWT Authentication
- CRUD Operations for Task Management
- Protected Routes using JWT
- Data Validation using Joi

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Validation:** Joi

## Setup and Run Locally

### Prerequisites
Ensure you have the following installed:
- Node.js (>=16)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/dhanan-2000/task-management.git
   cd task-management
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the root folder and add:
   ```env
   PORT=5000
   MONGO_URI=<your_mongo_atlas_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. **Run the server**
  Development
  
   ```sh
   npm run dev  # Starts with nodemon
   ```
   Production 

   ```sh
   npm start  # Starts with npm 
   ```

5. **Test API using Postman**
   - Import the Postman collection (`TaskManager.postman_collection.json`) provided in the repository.

## Deployment Details
The API is deployed on AWS and is accessible via the following base URL:
```sh
http://51.20.12.227:5000
```

## API Endpoints

### **Auth Routes**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Authenticate and receive a JWT token

### **Task Routes (Requires Auth)**
- `GET /api/tasks` → Get all tasks
- `POST /api/tasks` → Create a task
- `PUT /api/tasks/:taskId` → Update a task
- `DELETE /api/tasks/:taskId` → Delete a task


