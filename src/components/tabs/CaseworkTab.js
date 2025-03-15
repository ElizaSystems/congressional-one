import React, { useState } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Chip,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Sample casework data
const caseworkData = [
  { id: 1, constituent: 'John Smith', issue: 'VA Benefits', status: 'Open', priority: 'High', date: '2023-04-15' },
  { id: 2, constituent: 'Jane Doe', issue: 'Medicare Claims', status: 'In Progress', priority: 'Medium', date: '2023-04-10' },
  { id: 3, constituent: 'Robert Johnson', issue: 'Social Security', status: 'Closed', priority: 'Low', date: '2023-03-22' },
  { id: 4, constituent: 'Maria Garcia', issue: 'Immigration', status: 'Open', priority: 'High', date: '2023-04-12' },
  { id: 5, constituent: 'David Lee', issue: 'Tax Issues', status: 'In Progress', priority: 'Medium', date: '2023-04-01' },
  { id: 6, constituent: 'Sarah Wilson', issue: 'FEMA Assistance', status: 'Closed', priority: 'Low', date: '2023-03-15' },
  { id: 7, constituent: 'Michael Brown', issue: 'Passport Renewal', status: 'Open', priority: 'Medium', date: '2023-04-08' },
  { id: 8, constituent: 'Lisa Taylor', issue: 'Student Loans', status: 'In Progress', priority: 'High', date: '2023-04-05' },
];

// Data for pie chart
const issueTypeData = [
  { name: 'VA Benefits', value: 25 },
  { name: 'Medicare/Medicaid', value: 20 },
  { name: 'Immigration', value: 15 },
  { name: 'Social Security', value: 12 },
  { name: 'Tax Issues', value: 10 },
  { name: 'Passport/Visa', value: 8 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff7300'];

const statusColors = {
  'Open': 'primary',
  'In Progress': 'warning',
  'Closed': 'success'
};

const priorityColors = {
  'High': 'error',
  'Medium': 'warning',
  'Low': 'success'
};

function CaseworkTab() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newCase, setNewCase] = useState({
    constituent: '',
    issue: '',
    status: 'Open',
    priority: 'Medium',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleNewCaseChange = (prop) => (event) => {
    setNewCase({ ...newCase, [prop]: event.target.value });
  };

  const handleAddCase = () => {
    // In a real app, you would add the case to your database
    // and update the state accordingly
    setOpenDialog(false);
  };

  const filteredCases = caseworkData.filter((caseItem) => 
    caseItem.constituent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">
            Constituent Casework
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Case
          </Button>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search cases..."
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
                  <TableCell>Constituent</TableCell>
                  <TableCell>Issue</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCases
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.constituent}</TableCell>
                      <TableCell>{row.issue}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          color={statusColors[row.status]} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={row.priority} 
                          color={priorityColors[row.priority]} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCases.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Case Types
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={issueTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {issueTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} cases`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Case Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Open cases:</Typography>
              <Typography variant="body2" fontWeight="bold">24</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Cases this month:</Typography>
              <Typography variant="body2" fontWeight="bold">42</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Average resolution time:</Typography>
              <Typography variant="body2" fontWeight="bold">7.5 days</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      
      {/* Add New Case Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Constituent Case</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Constituent Name"
            fullWidth
            variant="outlined"
            value={newCase.constituent}
            onChange={handleNewCaseChange('constituent')}
          />
          <TextField
            margin="dense"
            label="Issue Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newCase.issue}
            onChange={handleNewCaseChange('issue')}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={newCase.status}
                label="Status"
                onChange={handleNewCaseChange('status')}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newCase.priority}
                label="Priority"
                onChange={handleNewCaseChange('priority')}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newCase.date}
            onChange={handleNewCaseChange('date')}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCase} variant="contained">Add Case</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default CaseworkTab; 