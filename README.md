# Contact Book App

A full-stack contact management application built with React, Node.js, Express, and SQLite.

## Features

- Add new contacts with name, email, and phone number
- View all contacts in a responsive layout
- Delete existing contacts
- Mobile-friendly interface with Bootstrap

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Structure

```
contact-book-app/
├── Backend/
│   ├── server.js
│   └── contacts.db
└── Frontend/
    └── src/
        ├── components/
        └── App.jsx
```

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Velugondaiah/contact-book-app.git
cd contact-book-app
```

2. **Install Backend Dependencies:**
```bash
cd Backend
npm install
```

3. **Install Frontend Dependencies:**
```bash
cd ../Frontend
npm install
```

## Running the Application

1. **Start the Backend Server:**
```bash
cd Backend
npm start
```
The server will run on http://localhost:5000

2. **Start the Frontend Development Server:**
```bash
cd Frontend
npm run dev
```
The frontend will run on http://localhost:5173

## API Endpoints

- `GET /users-contact-details` - Get all contacts
- `POST /add-users-contact-details` - Add a new contact
- `DELETE /delete-users-contact-details/:id` - Delete a contact

## Technologies Used

- Frontend:
  - React
  - Bootstrap
  - Vite
- Backend:
  - Node.js
  - Express
  - SQLite
  - CORS

## Contact

Project Link: [https://github.com/Velugondaiah/contact-book-app](https://github.com/Velugondaiah/contact-book-app)
