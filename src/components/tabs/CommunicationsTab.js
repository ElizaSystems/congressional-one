import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Tabs,
  Tab,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  IconButton,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for social media metrics
const socialMetrics = [
  { date: '2024-01', twitter: 1200, facebook: 2500, instagram: 1800 },
  { date: '2024-02', twitter: 1500, facebook: 2800, instagram: 2000 },
  { date: '2024-03', twitter: 1800, facebook: 3200, instagram: 2400 }
];

// Sample press releases
const pressReleases = [
  {
    id: 1,
    title: 'Statement on Infrastructure Bill',
    date: '2024-03-15',
    status: 'Published',
    engagement: 1250
  },
  {
    id: 2,
    title: 'New District Office Opening',
    date: '2024-03-10',
    status: 'Draft',
    engagement: 0
  }
];

// Sample newsletters
const newsletters = [
  {
    id: 1,
    title: 'March District Update',
    date: '2024-03-01',
    recipients: 5000,
    openRate: '35%'
  },
  {
    id: 2,
    title: 'Legislative Accomplishments Q1',
    date: '2024-03-15',
    recipients: 4800,
    openRate: '42%'
  }
];

// Sample social media posts
const socialPosts = [
  {
    id: 1,
    content: 'Proud to announce $2M in funding for local infrastructure projects...',
    platform: 'Twitter',
    scheduled: '2024-03-20 10:00',
    status: 'Scheduled'
  },
  {
    id: 2,
    content: 'Great meeting with local small business owners today...',
    platform: 'Facebook',
    scheduled: '2024-03-18 15:30',
    status: 'Published'
  }
];

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} role="tabpanel" id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function CommunicationsTab() {
  const [currentTab, setCurrentTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [newItem, setNewItem] = useState({
    title: '',
    content: '',
    platform: '',
    scheduled: '',
    recipients: ''
  });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleNewItemChange = (prop) => (event) => {
    setNewItem({ ...newItem, [prop]: event.target.value });
  };

  const handleAddItem = () => {
    // Here you would typically add the item to your database
    setOpenDialog(false);
    setNewItem({
      title: '',
      content: '',
      platform: '',
      scheduled: '',
      recipients: ''
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Press Releases" />
            <Tab label="Newsletters" />
            <Tab label="Social Media" />
          </Tabs>
        </Box>
      </Grid>

      {/* Overview Tab */}
      <TabPanel value={currentTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Social Media Engagement</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={socialMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" />
                    <Line type="monotone" dataKey="facebook" stroke="#4267B2" />
                    <Line type="monotone" dataKey="instagram" stroke="#C13584" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Recent Press Releases</Typography>
              <List>
                {pressReleases.slice(0, 3).map((release) => (
                  <ListItem key={release.id}>
                    <ListItemText
                      primary={release.title}
                      secondary={`${release.date} - ${release.status}`}
                    />
                    <Chip
                      label={`${release.engagement} views`}
                      size="small"
                      color="primary"
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Upcoming Social Posts</Typography>
              <List>
                {socialPosts.map((post) => (
                  <ListItem key={post.id}>
                    <ListItemText
                      primary={post.content}
                      secondary={`${post.platform} - ${post.scheduled}`}
                    />
                    <Chip
                      label={post.status}
                      size="small"
                      color={post.status === 'Published' ? 'success' : 'warning'}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Press Releases Tab */}
      <TabPanel value={currentTab} index={1}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('press')}
          >
            New Press Release
          </Button>
        </Box>
        <Grid container spacing={2}>
          {pressReleases.map((release) => (
            <Grid item xs={12} md={6} key={release.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{release.title}</Typography>
                  <Typography color="textSecondary">{release.date}</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={release.status}
                      color={release.status === 'Published' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton size="small"><EditIcon /></IconButton>
                  <IconButton size="small"><DeleteIcon /></IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Newsletters Tab */}
      <TabPanel value={currentTab} index={2}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('newsletter')}
          >
            New Newsletter
          </Button>
        </Box>
        <Grid container spacing={2}>
          {newsletters.map((newsletter) => (
            <Grid item xs={12} md={6} key={newsletter.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{newsletter.title}</Typography>
                  <Typography color="textSecondary">{newsletter.date}</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={`${newsletter.recipients} recipients`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`${newsletter.openRate} open rate`}
                      size="small"
                      color="success"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton size="small"><EditIcon /></IconButton>
                  <IconButton size="small"><SendIcon /></IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Social Media Tab */}
      <TabPanel value={currentTab} index={3}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('social')}
          >
            New Post
          </Button>
        </Box>
        <Grid container spacing={2}>
          {socialPosts.map((post) => (
            <Grid item xs={12} md={6} key={post.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {post.platform === 'Twitter' && <TwitterIcon color="primary" />}
                    {post.platform === 'Facebook' && <FacebookIcon color="primary" />}
                    {post.platform === 'Instagram' && <InstagramIcon color="primary" />}
                    <Typography sx={{ ml: 1 }}>{post.platform}</Typography>
                  </Box>
                  <Typography variant="body1">{post.content}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                    <ScheduleIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="textSecondary">
                      {post.scheduled}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton size="small"><EditIcon /></IconButton>
                  <IconButton size="small"><DeleteIcon /></IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {`New ${dialogType === 'press' ? 'Press Release' : 
             dialogType === 'newsletter' ? 'Newsletter' : 'Social Post'}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={newItem.title}
            onChange={handleNewItemChange('title')}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newItem.content}
            onChange={handleNewItemChange('content')}
          />
          {dialogType === 'social' && (
            <FormControl fullWidth margin="dense">
              <InputLabel>Platform</InputLabel>
              <Select
                value={newItem.platform}
                onChange={handleNewItemChange('platform')}
                label="Platform"
              >
                <MenuItem value="Twitter">Twitter</MenuItem>
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
              </Select>
            </FormControl>
          )}
          {(dialogType === 'social' || dialogType === 'newsletter') && (
            <TextField
              margin="dense"
              label="Schedule"
              type="datetime-local"
              fullWidth
              value={newItem.scheduled}
              onChange={handleNewItemChange('scheduled')}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained">
            {dialogType === 'social' ? 'Schedule Post' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default CommunicationsTab; 