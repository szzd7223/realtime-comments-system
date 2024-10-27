import { Paper, Typography, List, ListItem, ListItemText, Box, Divider } from '@mui/material';

export default function CommentList({ comments }) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment, index) => (
          <Box key={comment.id}>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {comment.username}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {comment.comment}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      {new Date(comment.timestamp).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < comments.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
}