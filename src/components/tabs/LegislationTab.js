import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample legislation data
const legislationData = [
  {
    id: "HR-1234",
    title: "Clean Energy Innovation Act",
    sponsor: "Rep. John Smith",
    introduced: "2024-02-15",
    status: "In Committee",
    lastAction: "Referred to House Energy Committee",
    priority: "High"
  },
  {
    id: "S-789",
    title: "Veterans Healthcare Improvement Act",
    sponsor: "Sen. Mary Johnson",
    introduced: "2024-02-10",
    status: "Floor Vote Scheduled",
    lastAction: "Passed Committee",
    priority: "High"
  },
  {
    id: "HR-456",
    title: "Small Business Relief Act",
    sponsor: "Rep. David Wilson",
    introduced: "2024-02-01",
    status: "In Committee",
    lastAction: "Committee Hearing Scheduled",
    priority: "Medium"
  },
  {
    id: "S-321",
    title: "Education Funding Reform",
    sponsor: "Sen. Sarah Brown",
    introduced: "2024-01-28",
    status: "Introduced",
    lastAction: "Referred to Senate Education Committee",
    priority: "Medium"
  }
];

// Sample vote history data for the chart
const voteHistoryData = [
  { month: 'Jan', yea: 12, nay: 8 },
  { month: 'Feb', yea: 15, nay: 5 },
  { month: 'Mar', yea: 10, nay: 10 },
  { month: 'Apr', yea: 18, nay: 2 },
];

const statusColors = {
  'Introduced': 'info',
  'In Committee': 'warning',
  'Floor Vote Scheduled': 'error',
  'Passed': 'success',
  'Failed': 'error'
};

const priorityColors = {
  'High': 'error',
  'Medium': 'warning',
  'Low': 'success'
};

function LegislationTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newBill, setNewBill] = useState({
    title: '',
    sponsor: '',
    status: 'Introduced',
    priority: 'Medium'
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNewBillChange = (prop) => (event) => {
    setNewBill({ ...newBill, [prop]: event.target.value });
  };

  const handleAddBill = () => {
    // In a real app, you would add the bill to your database
    setOpenDialog(false);
  };

  const filteredBills = legislationData.filter((bill) =>
    bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.sponsor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      {/* Header Section */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">
            Legislation Tracking
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Bill
          </Button>
        </Box>
      </Grid>

      {/* Search and Table Section */}
      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search legislation..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
            />
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Bill ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Sponsor</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{bill.id}</TableCell>
                    <TableCell>
                      <Link href="#" underline="hover">
                        {bill.title}
                      </Link>
                    </TableCell>
                    <TableCell>{bill.sponsor}</TableCell>
                    <TableCell>
                      <Chip
                        label={bill.status}
                        color={statusColors[bill.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={bill.priority}
                        color={priorityColors[bill.priority]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Statistics Section */}
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Vote History
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={voteHistoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="yea" fill="#4caf50" name="Yea" />
              <Bar dataKey="nay" fill="#f44336" name="Nay" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Add New Bill Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Bill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Bill Title"
            fullWidth
            value={newBill.title}
            onChange={handleNewBillChange('title')}
          />
          <TextField
            margin="dense"
            label="Sponsor"
            fullWidth
            value={newBill.sponsor}
            onChange={handleNewBillChange('sponsor')}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={newBill.status}
              onChange={handleNewBillChange('status')}
              label="Status"
            >
              <MenuItem value="Introduced">Introduced</MenuItem>
              <MenuItem value="In Committee">In Committee</MenuItem>
              <MenuItem value="Floor Vote Scheduled">Floor Vote Scheduled</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select
              value={newBill.priority}
              onChange={handleNewBillChange('priority')}
              label="Priority"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddBill} variant="contained">Add Bill</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default LegislationTab; 