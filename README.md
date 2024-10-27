# Real-Time Comments System

A real-time comments system built with Next.js, Node.js, Socket.IO, and MySQL. Users can log in with a username and post comments that appear in real-time for all connected users.

## Features

- Simple username-based authentication
- Real-time comment updates using Socket.IO
- Material UI components
- MySQL database for persistent storage
- Responsive design

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm (usually comes with Node.js)
- git

## Clone the repository
   ```bash
   git clone https://github.com/szzd7223/realtime-comments-system

   cd realtime-comments-system
   ```

## Project Structure

```
project-root/
├── backend/                    
│   ├── node_modules/
│   ├── package.json
│   └── server.js              
├── frontend/                   
│   ├── node_modules/
│   ├── public/               
│   ├── pages/                
│   │   ├── _app.js          
│   │   └── index.js         
│   ├── components/          
│   │   ├── LoginForm.js
│   │   ├── CommentForm.js
│   │   ├── CommentList.js
│   ├── utils/              
│   │   └── api.js         
│   └── package.json
└── README.md
```

## Setup Instructions

### 1. Database Setup
```sql
CREATE DATABASE comments_db;
USE comments_db;

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  comment TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install express mysql2 socket.io cors uuid

# Update MySQL connection in server.js with your credentials
# Default credentials in server.js:
# host: 'localhost'
# user: 'root'
# password: 'your_password'
# database: 'comments_db'

# Start server
node server.js
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled axios socket.io-client --legacy-peer-deps

# Start development server
npm run dev
```

## Usage

1. Open http://localhost:3000 in your browser
2. Enter a username to log in
3. Start posting comments
4. Open another browser window to see real-time updates

## Assumptions Made

1. Authentication:
   - Simple username-based authentication (no password required)
   - Session IDs are generated but stored in memory (will be lost on server restart)
   - No user validation or uniqueness check for usernames

2. Database:
   - MySQL is running locally
   - Default credentials are used
   - No data encryption implemented

3. Network:
   - Frontend runs on port 3000
   - Backend runs on port 5000
   - CORS is enabled for all origins in development
