# Coursa LMS — Backend

REST API for the Coursa Learning Management System, built with Node.js, Express, and MongoDB.

🔗 **Base URL:** [https://mini-lms-backend-pkgt.onrender.com](https://mini-lms-backend-pkgt.onrender.com)

---

## Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing

---

## Features

- JWT-based authentication with role support (student / admin)
- Course CRUD with publish/draft toggling
- Lesson management per course
- Progress tracking per user per course
- Admin stats endpoint (total courses, lessons, enrollments)
- Protected routes with role-based middleware

---

## Project Structure

```
src/
├── controllers/
│   ├── authController.js
│   ├── courseController.js
│   ├── lessonController.js
│   └── progressController.js
├── models/
│   ├── User.js
│   ├── Course.js
│   ├── Lesson.js
│   └── Progress.js
├── routes/
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── lessonRoutes.js
│   └── progressRoutes.js
├── middleware/
│   ├── verifyJWT.js
│   └── verifyAdmin.js
└── server.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account or local MongoDB instance

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/coursa-backend.git
cd coursa-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```

### Running Locally

```bash
# Development
npm run dev

# Production
npm start
```

The server will run at `http://localhost:5000`.

---

## API Reference

All protected routes require an `Authorization: Bearer <token>` header.

---

### Auth

#### Register
```
POST /auth/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:** `201` — `{ message, accessToken }`

---

#### Login
```
POST /auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:** `200` — `{ accessToken }`

---

### Courses

#### Get all published courses
```
GET /courses
```
🔒 Protected

**Response:** `200` — Array of course objects

---

#### Get course by ID
```
GET /courses/:id
```
🔒 Protected

**Response:** `200` — `{ course, lessons }`

---

#### Get admin courses
```
GET /courses/admin
```
🔒 Admin only

**Response:** `200` — All courses regardless of publish status

---

#### Create course
```
POST /courses
```
🔒 Admin only

**Body:**
```json
{
  "title": "Course Title",
  "description": "Course description",
  "category": "Programming",
  "thumbnailUrl": "https://..."
}
```
**Response:** `201` — `{ message, course }`

---

#### Update course
```
PUT /courses/:id
```
🔒 Admin only

**Body:** Any combination of `title`, `description`, `category`, `thumbnailUrl`

**Response:** `200` — `{ message, course }`

---

#### Delete course
```
DELETE /courses/:id
```
🔒 Admin only

**Response:** `200` — `{ message }`

---

#### Toggle publish status
```
PATCH /courses/:id/publish
```
🔒 Admin only

**Response:** `200` — `{ message, isPublished }`

---

#### Get stats
```
GET /courses/stats
```
🔒 Admin only

**Response:**
```json
{
  "totalCourses": 10,
  "totalLessons": 45,
  "totalEnrollments": 200
}
```

---

### Lessons

#### Get lessons for a course
```
GET /lessons/:courseId
```
🔒 Protected

**Response:** `200` — Array of lesson objects

---

#### Create lesson
```
POST /lessons/:courseId
```
🔒 Admin only

**Body:**
```json
{
  "title": "Lesson Title",
  "youtubeUrl": "https://www.youtube.com/watch?v=...",
  "order": 1
}
```
**Response:** `201` — `{ message, lesson }`

---

### Progress

#### Get progress for a course
```
GET /progress/:courseId
```
🔒 Protected

**Response:**
```json
{
  "completedLessons": ["lessonId1", "lessonId2"]
}
```

---

#### Mark lesson complete
```
POST /progress/:courseId/:lessonId
```
🔒 Protected

**Response:** `200` — `{ message }`

---

#### Get enrolled courses
```
GET /progress/my-courses
```
🔒 Protected

**Response:** Array of progress documents with populated course data

---

#### Enroll in course
```
POST /progress/enroll/:courseId
```
🔒 Protected

**Response:** `201` — `{ message }`

---

## Deployment

The backend is deployed on **Render**. The free tier spins down after inactivity — the first request after idle may take 30–60 seconds to respond.

Make sure all environment variables (`MONGO_URI`, `ACCESS_TOKEN_SECRET`, `PORT`) are set in your Render service settings.
