import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// Sample schedule data
const scheduleData = [
  {
    id: 1,
    title: "Committee Hearing",
    type: "Hearing",
    date: "2024-03-15",
    time: "10:00",
    location: "Room H-137 Capitol Building",
    description: "Energy and Commerce Committee Hearing on Clean Energy",
    attendees: ["Rep. Smith", "Staff Director", "Legislative Director"],
    priority: "High"
  },
  {
    id: 2,
    title: "Constituent Meeting",
    type: "Meeting",
    date: "2024-03-15",
    time: "14:00",
    location: "District Office",
    description: "Meeting with Local Business Leaders",
    attendees: ["Rep. Smith", "District Director"],
    priority: "Medium"
  }
];

const eventTypes = ["Hearing", "Meeting", "Vote", "Travel", "Other"];
const priorityLevels = ["High", "Medium", "Low"];

function ScheduleTab() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'Meeting',
    date: selectedDate,
    time: '',
    location: '',
    description: '',
    attendees: '',
    priority: 'Medium'
  });

  const handleNewEventChange = (prop) => (event) => {
    setNewEvent({ ...newEvent, [prop]: event.target.value });
  };

  const handleAddEvent = () => {
    // Here you would typically add the event to your backend
    console.log('New event:', newEvent);
    setOpenDialog(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Schedule</Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Event
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Select Date</Typography>
          <TextField
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Events</Typography>
          <List>
            {scheduleData.map((event) => (
              <React.Fragment key={event.id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" aria-label="edit" size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {event.title}
                        <Chip 
                          label={event.type} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                        <Chip 
                          label={event.priority} 
                          size="small" 
                          color={getPriorityColor(event.priority)}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {event.location}
                        </Box>
                        <Typography variant="body2">
                          {event.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={newEvent.title}
            onChange={handleNewEventChange('title')}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={newEvent.type}
                onChange={handleNewEventChange('type')}
                label="Event Type"
              >
                {eventTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newEvent.priority}
                onChange={handleNewEventChange('priority')}
                label="Priority"
              >
                {priorityLevels.map((priority) => (
                  <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              type="date"
              label="Date"
              value={newEvent.date}
              onChange={handleNewEventChange('date')}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="time"
              label="Time"
              value={newEvent.time}
              onChange={handleNewEventChange('time')}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={newEvent.location}
            onChange={handleNewEventChange('location')}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newEvent.description}
            onChange={handleNewEventChange('description')}
          />
          <TextField
            margin="dense"
            label="Attendees"
            fullWidth
            placeholder="Enter attendees separated by commas"
            value={newEvent.attendees}
            onChange={handleNewEventChange('attendees')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEvent} variant="contained">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ScheduleTab; 