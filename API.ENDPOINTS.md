# Neo Blog API Endpoints

> **Note**: All APIs are prefixed with `/api`.

---

## Authentication Endpoints

### 1. Register User

**POST** `/auth/register`

**Payload Example**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

---

### 2. Login User

**POST** `/auth/login`

**Payload Example**:

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

---

## Blog Management Endpoints

### 1. Create Blog

**POST** `/blogs`  
**Authorization Required**: `Authorization: Bearer <token>`

**Payload Example**:

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

---

### 2. Update Blog

**PATCH** `/blogs/:id`  
**Authorization Required**: `Authorization: Bearer <token>`

**Payload Example**:

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

---

### 3. Delete Blog

**DELETE** `/blogs/:id`  
**Authorization Required**: `Authorization: Bearer <token>`

---

### 4. Get All Blogs (Public)

**GET** `/blogs`

**Query Parameters**:

- `search`: Search blogs by title or content (e.g., `search=blogTitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending - default) or `desc` (descending) (e.g., `sortOrder=desc`).
- `filter`: Filter blogs by author ID (e.g., `filter=authorId`).

**Example Request URL**:

```plaintext
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

---

## Admin Actions

### 1. Block User

**PATCH** `/admin/users/:userId/block`  
**Authorization Required**: `Authorization: Bearer <admin_token>`

---

### 2. Delete Blog

**DELETE** `/admin/blogs/:id`  
**Authorization Required**: `Authorization: Bearer <admin_token>`

---
