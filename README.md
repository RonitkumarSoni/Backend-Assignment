# Notes Management REST API

Backend assignment project built with Node.js, Express, MongoDB, and Mongoose using MVC architecture.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- nodemon

## Project Structure

```text
notes-app/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── note.controller.js
│   ├── middlewares/
│   ├── models/
│   │   └── note.model.js
│   ├── routes/
│   │   └── note.routes.js
│   ├── app.js
│   └── index.js
├── .env
├── .env.example
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

## Installation

```bash
npm install
```

## Run the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Base URL

```text
http://localhost:5000/api/notes
```

## API Endpoints

### 1. Create a Note

- Method: `POST`
- Endpoint: `/api/notes`

Request body:

```json
{
  "title": "Team standup agenda",
  "content": "Discuss sprint blockers and deployment plan",
  "category": "work",
  "isPinned": true
}
```

### 2. Create Multiple Notes

- Method: `POST`
- Endpoint: `/api/notes/bulk`

Request body:

```json
{
  "notes": [
    { "title": "Note one", "content": "Content one", "category": "work" },
    { "title": "Note two", "content": "Content two", "category": "study" },
    { "title": "Note three", "content": "Content three", "category": "personal" }
  ]
}
```

### 3. Get All Notes

- Method: `GET`
- Endpoint: `/api/notes`

### 4. Get Single Note

- Method: `GET`
- Endpoint: `/api/notes/:id`

### 5. Replace a Note

- Method: `PUT`
- Endpoint: `/api/notes/:id`

Request body:

```json
{
  "title": "Completely new title",
  "content": "Completely new content",
  "category": "personal",
  "isPinned": false
}
```

### 6. Update a Note

- Method: `PATCH`
- Endpoint: `/api/notes/:id`

Request body:

```json
{
  "isPinned": true
}
```

### 7. Delete a Note

- Method: `DELETE`
- Endpoint: `/api/notes/:id`

### 8. Delete Multiple Notes

- Method: `DELETE`
- Endpoint: `/api/notes/bulk`

Request body:

```json
{
  "ids": [
    "64b1f2c3e4d5a6b7c8d9e0f1",
    "64b1f2c3e4d5a6b7c8d9e0f2",
    "64b1f2c3e4d5a6b7c8d9e0f3"
  ]
}
```

## Response Format

Success response:

```json
{
  "success": true,
  "message": "Message here",
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Error message here",
  "data": null
}
```

## Validation Rules Covered

- `title` and `content` are required while creating a note
- invalid MongoDB ObjectId returns `400`
- missing note returns `404`
- empty PATCH body returns `400`
- empty bulk create array returns `400`
- empty bulk delete array returns `400`

## Submission Checklist

- GitHub repository link
- Postman documentation link
- Deployed backend link
