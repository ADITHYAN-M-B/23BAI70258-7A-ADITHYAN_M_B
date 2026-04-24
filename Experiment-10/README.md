# Experiment 10: Student CRUD REST API

A simple REST API built with Node.js, Express, MongoDB, and Mongoose to perform CRUD operations on student records.

## Features

- Create a student
- Read all students
- Read a student by ID
- Update a student by ID
- Delete a student by ID
- MongoDB integration using Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## Detailed Explanation

### Node.js and Express.js as Backend

This project uses Node.js as the runtime environment and Express.js as the web framework. Node.js enables non-blocking, event-driven server-side execution, which is suitable for API development. Express.js is used to define routes, process incoming HTTP requests, and return JSON responses. Together, they provide a lightweight and efficient backend for building RESTful services.

### MongoDB Stores Records

MongoDB is used as the database to store student records. Since MongoDB is document-based, student data is stored as JSON-like documents, which maps naturally to JavaScript objects used in the backend. Mongoose is used as the ODM (Object Data Modeling) library to define the Student schema and interact with MongoDB through model methods such as create, find, findById, findByIdAndUpdate, and findByIdAndDelete.

### CRUD Operations Implemented with REST APIs

The project implements full CRUD functionality using REST principles:

- Create: POST /api/students
- Read All: GET /api/students
- Read One: GET /api/students/:id
- Update: PUT /api/students/:id
- Delete: DELETE /api/students/:id

Each route corresponds to a specific HTTP method and operation, making the API easy to understand and consistent with standard REST conventions.

### Tested Using Postman

All API endpoints were tested using Postman. Postman was used to send HTTP requests with JSON payloads, verify responses, and validate the behavior of each CRUD operation. This includes testing successful creation, retrieval, update, and deletion of student records, along with checking response data formats.

## Project Structure

```text
experiment10/
|-- models/
|   `-- Student.js
|-- routes/
|   `-- studentRoutes.js
|-- server.js
|-- package.json
`-- README.md
```

## API Base URL

http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | / | Health check |
| POST | /api/students | Create a new student |
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get one student by ID |
| PUT | /api/students/:id | Update student by ID |
| DELETE | /api/students/:id | Delete student by ID |

## Data Model

Each student document uses the following fields:

```json
{
   "name": "String",
   "email": "String",
   "course": "String"
}
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or MongoDB Atlas URI

### Installation

```bash
npm install
```

### Configure MongoDB

The project currently uses this connection in server.js:

```js
const MONGO_URI = "mongodb://127.0.0.1:27017/studentDB";
```

If you use MongoDB Atlas, replace the URI with your Atlas connection string.

### Run the Server

Production mode:

```bash
npm start
```

Development mode (auto-restart with nodemon):

```bash
npm run dev
```

Server will run at:

http://localhost:5000

## Sample Requests

### Create Student

POST /api/students

```json
{
   "name": "Adithyan MB",
   "email": "adithyan@example.com",
   "course": "B.E. Computer Science"
}
```

### Update Student

PUT /api/students/:id

```json
{
   "course": "Artificial Intelligence"
}
```

### Delete Student

DELETE /api/students/:id

Response:

```json
{
   "message": "Record Deleted Successfully"
}
```


