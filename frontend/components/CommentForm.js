// components/CommentForm.js
import { TextField, Button, Paper, Typography } from '@mui/material';

export default function CommentForm({ onSubmit, comment, setComment }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Post a Comment
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Post Comment
        </Button>
      </form>
    </Paper>
  );
}