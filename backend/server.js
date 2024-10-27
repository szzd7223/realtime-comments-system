const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ssss',
  database: 'comments_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  const sessionId = uuidv4();
  res.json({ sessionId, username });
});

// Get all comments
app.get('/api/comments', (req, res) => {
  const query = 'SELECT * FROM comments ORDER BY timestamp DESC';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching comments' });
      return;
    }
    res.json(results);
  });
});

// Post new comment
app.post('/api/comments', (req, res) => {
  const { username, comment } = req.body;
  const query = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
  
  db.query(query, [username, comment], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error posting comment' });
      return;
    }

    // Fetch the newly created comment
    const newCommentQuery = 'SELECT * FROM comments WHERE id = ?';
    db.query(newCommentQuery, [result.insertId], (err, comments) => {
      if (err || !comments.length) {
        res.status(500).json({ error: 'Error fetching new comment' });
        return;
      }

      const newComment = comments[0];
      // Broadcast the new comment to all connected clients
      io.emit('newComment', newComment);
      res.json(newComment);
    });
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});