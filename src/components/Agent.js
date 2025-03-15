import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

function Agent({ messages, userRequest, setUserRequest, onSendRequest }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRequest.trim()) {
      onSendRequest(userRequest);
      setUserRequest('');
    }
  };

  return (
    <Paper elevation={3} sx={{ position: 'fixed', right: 20, bottom: 20, width: 350, height: 500, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #eee', bgcolor: '#3f51b5', color: 'white' }}>
        <Typography variant="h6">
          <SmartToyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Congressional AI Assistant
        </Typography>
      </Box>
      
      <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="body2" color="text.secondary">
              How can I help you today?
            </Typography>
          </Box>
        ) : (
          messages.map((msg, index) => (
            <ListItem key={index} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                {msg.sender === 'agent' ? 
                  <SmartToyIcon fontSize="small" sx={{ mr: 1 }} /> : 
                  <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                }
                <Typography variant="caption" color="text.secondary">
                  {msg.sender === 'agent' ? 'Assistant' : 'You'}
                </Typography>
              </Box>
              <Paper elevation={1} sx={{ 
                p: 1.5, 
                bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5', 
                maxWidth: '80%', 
                borderRadius: 2
              }}>
                <Typography variant="body2">{msg.text}</Typography>
              </Paper>
            </ListItem>
          ))
        )}
      </List>
      
      <Divider />
      
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, display: 'flex' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ask me anything..."
          value={userRequest}
          onChange={(e) => setUserRequest(e.target.value)}
          variant="outlined"
          sx={{ mr: 1 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
}

export default Agent; 