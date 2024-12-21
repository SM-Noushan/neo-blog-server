# Neo Blog - A Professional Blogging Platform Backend

## Overview

Neo Blog is a robust backend application designed for a blogging platform. It facilitates users and admins with role-based features for managing blogs. The platform supports secure authentication, advanced authorization, and rich API functionalities such as search, sort, and filter.

---

## Features

### Roles and Permissions

1. **Admin**

   - Can block users.
   - Can delete any blog.

2. **User**
   - Can register, log in, and create blogs.
   - Can update and delete only their blogs.

### Blog Management

- Comprehensive CRUD operations for blogs.
- Public API with **search**, **sort**, and **filter** capabilities.

### Authentication and Authorization

- JWT-based secure login system.
- Differentiated access levels for Admin and User roles.

### Data Integrity:

- Ensured using Zod validation and Mongoose schema.

---

## Error Handling

Error handling in Neo Blog ensures smooth user interaction and efficient debugging. All errors follow a unified response structure for consistency.

#### Generic Error Template

```json
    {
      "success": false,
      "statusCode": 404,
      "message": "A brief error message explaining what went wrong",
      "error": {"Detailed error object or message"},
      "stack": "Error stack trace (for development mode)"
    }
```

---

## Environment Variables

All necessary environment variable names are provided in the `.env.example` file. This file serves as a reference to configure your local or production environment. Ensure you create a `.env` file in your project root and populate it with the correct values.

Example variables include:

- `DB_URI`: Connection string for the database.
- `JWT_ACCESS_SECRET`: Secret key for token generation.
- `PORT`: Port number for the server.

For a full list of environment variables, check the `.env.example` file in the project root.

---

## API Highlights

- **User Registration**: Enables new users to create accounts as well as generate JWT token.
- **Login**: Generates JWT token for authenticated sessions.
- **Blog Management**: Allows users to create, update, delete blogs, and access public APIs.
- **Admin Actions**: Admins can manage users and blogs at an elevated level.

For detailed API endpoints, refer to the `API.ENDPOINTS.md` file.

---

## Project Setup

### Prerequisites

- Node.js (v16+)
- TypeScript

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sm-noushan/neo-blog-server
   cd neo-blog-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file from `.env.example` and set the necessary environment variables.

4. Start the development server:

   ```bash
   npm run start:dev
   ```

5. Access the API at `http://localhost:<YOUR_PORT>`.

---

## Contribution

Contributions to Neo Blog are welcome. Follow these steps:

1. Fork the repository.
2. Clone the forked repository.
3. Create a feature branch and implement changes.
4. Submit a pull request.
