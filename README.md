# Online Library Management System Documentation

## 1. Introduction

### 1.1 Purpose

The Online Library Management System serves as a centralized platform designed to streamline and automate library operations. Its primary purpose is to efficiently manage and organize library resources, including books, user information, and transactional data, within a digital ecosystem.

### 1.2 Scope

The system's scope includes:

- **Book Management**: Addition, removal, and editing of book information including title, author, availability status, etc.
- **User Interactions**: Browsing the library catalog, viewing personal transaction history, and accessing relevant information.
- **Admin Operations**: Managing the inventory, user accounts, and transactional activities.

Assumptions:

- **Read-Only for Regular Users**: Regular users have restricted privileges and can only view information without modification rights.
- **Exclusive Administrative Control**: Administrative operations are solely accessible to authorized administrators.

## 2. System Overview

### 2.1 Architecture Overview

The architecture of the Online Library Management System is built upon the MERN stack:

#### Frontend Architecture:

- **React.js** with **Tailwind CSS**: Ensures a responsive and modular UI design.

#### Backend Architecture:

- **Node.js** with **Express.js**: Handles server-side operations and API endpoints.
- **MongoDB**: NoSQL database for flexible and scalable data storage.

### 2.2 Key Features

#### 1. Catalog Management

- **Book Addition & Removal**: Administrators can easily manage the catalog by adding or removing books.
- **Book Details**: Comprehensive information including title, author, availability, and genre.

#### 2. User Interactions

- **Browsing Catalog**: Users explore the collection, filter books, and check availability.
- **Personal History**: Access to transaction history for borrowed and returned books.

#### 3. Administrative Control

- **Inventory Management**: Complete control over library inventory.
- **User Management**: Admins manage user accounts and profiles.

#### 4. Responsive Design

- **User-Friendly Interface**: Seamless experience across devices.

#### 5. Transaction Handling

- **Issue & Return**: Smooth book issuance and return processes.

## 6. Security Measures

### Authentication Mechanisms

#### JWT Implementation

- **JSON Web Tokens (JWT)**: Provides secure and stateless authentication.

### Role-Based Authentication

#### Role-Based Access Control (RBAC)

- **Administrative Privileges**: Exclusive access to administrative functionalities.
- **Limited User Privileges**: Read-only access for regular users.

### Other Security Measures

#### Input Validation

- **Input Sanitization**: Prevents common vulnerabilities like SQL injection and XSS attacks.

#### Error Handling and Logging

- **Error Handling**: Prevents sensitive information leakage.
- **Logging**: Comprehensive logs for traceability and threat identification.

# How to run Locally

## Clone the repository

```bash
git clone https://github.com/shyamenk/Library-Management
```

## Backend Setup

1. **Navigate to the Backend Directory:**

   - `cd` into the backend directory within the cloned repository.

2. **Install Dependencies:**

   - Run `npm install` to install the required Node.js dependencies.

3. **Set Up Environment Variables:**

   - Rename `.env copy` to `.env` file in the backend directory.
   - Define environment variables like `MONGODB_URI` for your MongoDB connection and other required variables.

4. **Start the Backend Server:**

   - Run `npm start` or `node server.js` to start the backend server. Ensure it's running on the specified port.
   - You can access it at [http://localhost:4000](http://localhost:4000).

## Frontend Setup

1. **Navigate to the Frontend Directory:**

   - Open a separate terminal/command prompt window.
   - Go to the frontend directory within the cloned repository.

2. **Install Dependencies:**

   - Run `npm install` to install the required frontend dependencies.

3. **Start the Frontend Application:**

   - Run `npm start` to start the frontend application.
   - The frontend will likely start on [http://localhost:3000](http://localhost:3000).

## API ENDPOINTS

### Auth Routes

- **POST /login**

  - Endpoint: `/login`
  - Controller Method: `AuthController.loginUser`

- **GET /refresh**

  - Endpoint: `/refresh`
  - Controller Method: `AuthController.refresh`

- **POST /logout**
  - Endpoint: `/logout`
  - Controller Method: `AuthController.logOut`

### Book Routes

- **GET /books**

  - Endpoint: `/`
  - Controller Method: `BookController.getAllBooks`

- **POST /books**

  - Endpoint: `/`
  - Controller Method: `BookController.addBook`
  - Middleware: `authMiddleware`

- **PUT /books/:bookId**

  - Endpoint: `/:bookId`
  - Controller Method: `BookController.updateBook`
  - Middleware: `authMiddleware`

- **DELETE /books/:bookId**
  - Endpoint: `/:bookId`
  - Controller Method: `BookController.deleteBook`
  - Middleware: `authMiddleware`

### Transaction Routes

- **POST /transactions/request**

  - Endpoint: `/request`
  - Controller Method: `TransactionController.requestBook`

- **GET /transactions/pending**

  - Endpoint: `/pending`
  - Controller Method: `TransactionController.getPendingApproval`

- **POST /transactions/approve/:approveId**

  - Endpoint: `/approve/:approveId`
  - Controller Method: `TransactionController.approveBookRequest`

- **POST /transactions/return**
  - Endpoint: `/return`
  - Controller Method: `TransactionController.returnBook`

### User Routes

- **POST /users/register**

  - Endpoint: `/register`
  - Controller Method: `UserController.registerUser`

- **GET /users**

  - Endpoint: `/`
  - Controller Method: `UserController.getAllUsers`
  - Middleware: `authMiddleware`

- **GET /users/:userId**

  - Endpoint: `/:userId`
  - Controller Method: `UserController.getUserById`

- **PUT /users/:userId**

  - Endpoint: `/:userId`
  - Controller Method: `UserController.updateUser`
  - Middleware: `authMiddleware`

- **DELETE /users/:userId**

  - Endpoint: `/:userId`
  - Controller Method: `UserController.deleteUser`
  - Middleware: `authMiddleware`

- **GET /users/:userId/transactions**
  - Endpoint: `/:userId/transactions`
  - Controller Method: `UserController.getUserTransactions`

## Database Schemas

### User Schema

#### Fields:

- **username**: String
- **name**: String
- **email**: String (Unique)
- **role**: String (Enum: "User", "Admin" - Default: "User")
- **password**: String
- **contactNumber**: String

### Transaction Schema

#### Fields:

- **user**: ObjectId (Reference: User)
- **book**: ObjectId (Reference: Book)
- **dueDate**: Date
- **transactionType**: String (Enum: "Borrowed", "Returned")

### Book Schema

#### Fields:

- **name**: String
- **author**: String
- **availabilityStatus**: String (Enum: "Available", "Borrowed" - Default: "Available")
- **imageURL**: String

### Approval Schema

#### Fields:

- **user**: ObjectId (Reference: User)
- **book**: ObjectId (Reference: Book)
- **status**: String (Enum: "Pending", "Approved" - Default: "Pending")

## Contribution

Contributions to the system are welcomed! Whether it's bug fixes, feature enhancements, or documentation improvements, your contributions are valuable to enhance the system's functionality and usability.

## Conclusion

The Online Library Management System streamlines library operations, providing efficient catalog management, user interactions, and robust security measures. By leveraging modern technologies and following industry-standard practices, the system ensures a seamless experience for administrators and users alike.

```

```
