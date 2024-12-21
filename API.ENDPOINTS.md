# Neo Blog API Endpoints

> **Note**: All APIs are prefixed with `/api`.

---

## Authentication Endpoints

### 1. Register User

**POST** `/auth/register`

### 2. Login User

**POST** `/auth/login`

---

## Blog Management Endpoints

### 1. Create Blog

**POST** `/blogs`

### 2. Update Blog

**PATCH** `/blogs/:id`

### 3. Delete Blog

**DELETE** `/blogs/:id`

### 4. Get All Blogs (Public)

**GET** `/blogs`

**Query Parameters**:

- `search`: Search blogs by title or content (e.g., `search=blogTitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending - (default)) or `desc` (descending) (e.g., `sortOrder=desc`).
- `filter`: Filter blogs by author ID (e.g., `filter=authorId`).

---

## Admin Actions

### 1. Block User

**PATCH** `/admin/users/:userId/block`

### 2. Delete Blog

**DELETE** `/admin/blogs/:id`
