import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Container, Box } from '@mui/material';
import { api } from '../utils/api';
import LoginForm from '../components/LoginForm';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

let socket;

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Initialize socket connection
    socket = io('http://localhost:5000');

    // Listen for new comments
    socket.on('newComment', (newComment) => {
      setComments(prevComments => [newComment, ...prevComments]);
    });

    // Fetch existing comments
    fetchComments();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const fetchComments = async () => {
    try {
      const response = await api.getComments();
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login(username);
      setSessionId(response.data.sessionId);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await api.postComment(username, comment.trim());
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        {!isLoggedIn ? (
          <LoginForm 
            onLogin={handleLogin}
            username={username}
            setUsername={setUsername}
          />
        ) : (
          <CommentForm 
            onSubmit={handleSubmitComment}
            comment={comment}
            setComment={setComment}
          />
        )}
        <CommentList comments={comments} />
      </Box>
    </Container>
  );
}