import { TextField, Button, Paper, Typography } from '@mui/material';

export default function LoginForm({ onLogin, username, setUsername }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(e);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Login to Comment
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
}