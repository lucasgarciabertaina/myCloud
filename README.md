---
# **My Cloud - Version 1**

My Cloud is a basic cloud file management API that allows users to perform CRUD operations on files stored in a cloud environment (AWS S3). This is the first version of the project, focusing on establishing the core functionalities for file handling.
---

## **Features**

- **File Upload**: Users can upload files to the cloud storage.
- **File Retrieval**: Users can retrieve files using a unique identifier.
- **File Deletion**: Users can delete files from the cloud.
- **Authentication**:
  - Login system with JWT-based authentication.
  - Passwords are securely stored using hashing.
- **Token Expiration**: JWT tokens have a defined expiration time for security.

---

## **Tech Stack**

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Programming Language**: TypeScript
- **Cloud Storage**: [AWS S3](https://aws.amazon.com/s3/)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: Bcrypt for hashing

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/lucasgarciabertaina/myCloud.git
   cd myCloud
   ```

2. Install dependencies:

   ```bash
   yarn add
   ```

3. Set up environment variables:  
   Create a `.env` file in the root directory and add the following variables:

   ```env
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=your-aws-region
   S3_BUCKET_NAME=your-s3-bucket-name

   JWT_SECRET=your-jwt-secret
   JWT_EXPIRES_IN=3600 # Token expiration time in seconds
   ```

4. Start the application:
   ```bash
   yarn start
   ```

---

## **API Documentation**

### **Base URL**

Local: `http://localhost:3000`

---

### **Endpoints**

#### **Authentication**

- **POST /auth/login**  
  Authenticate a user and retrieve a JWT token.  
  **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
  **Response:**
  ```json
  {
    "message": "Login successful",
    "data": "jwt-token-example",
    "statusCode": 200
  }
  ```

---

#### **File Operations**

- **POST /files/upload**  
  Upload a file to cloud storage.  
  **Headers:**  
  `Authorization: Bearer <JWT Token>`  
  **Request:**  
  Multipart/form-data with a `file` field.

  **Response:**

  ```json
  {
    "message": "File uploaded successfully",
    "data": "file-key",
    "statusCode": 200
  }
  ```

- **GET /files/:key**  
  Retrieve a file from cloud storage using its unique key.  
  **Headers:**  
  `Authorization: Bearer <JWT Token>`  
  **Response:**  
  Returns the file as a downloadable object.

- **DELETE /files/:key**  
  Delete a file from cloud storage.  
  **Headers:**  
  `Authorization: Bearer <JWT Token>`  
  **Response:**
  ```json
  {
    "message": "File deleted successfully",
    "data": null,
    "statusCode": 200
  }
  ```

---

## **Future Improvements**

- Add a database for user and file management (Version 2).
- Implement roles and permissions for better access control.
- Add refresh tokens for enhanced security.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Let me know if you’d like to customize it further or add additional sections!
