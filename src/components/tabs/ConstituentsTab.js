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
  MenuItem,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Sample constituent data
const constituentData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, ST 12345',
    district: 'District 1',
    category: 'Regular Contact',
    lastContact: '2024-03-01',
    interests: ['Veterans Affairs', 'Healthcare']
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave, Somewhere, ST 12345',
    district: 'District 2',
    category: 'Community Leader',
    lastContact: '2024-02-28',
    interests: ['Education', 'Environment']
  }
];

// Data for analytics
const categoryData = [
  { name: 'Regular Contact', value: 45 },
  { name: 'Community Leader', value: 25 },
  { name: 'Business Owner', value: 20 },
  { name: 'Advocate', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function ConstituentsTab() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedConstituent, setSelectedConstituent] = useState(null);
  const [newConstituent, setNewConstituent] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    category: 'Regular Contact',
    interests: ''
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

  const handleNewConstituentChange = (prop) => (event) => {
    setNewConstituent({ ...newConstituent, [prop]: event.target.value });
  };

  const handleAddConstituent = () => {
    // Here you would typically add the constituent to your database
    setOpenDialog(false);
    setNewConstituent({
      name: '',
      email: '',
      phone: '',
      address: '',
      district: '',
      category: 'Regular Contact',
      interests: ''
    });
  };

  const filteredConstituents = constituentData.filter((constituent) =>
    constituent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    constituent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    constituent.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">
            Constituent Directory
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Constituent
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search constituents..."
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
                  <TableCell>Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Last Contact</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredConstituents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="primary">
                            <EmailIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <PhoneIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>{row.district}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{row.lastContact}</TableCell>
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
            component="div"
            count={filteredConstituents.length}
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
            Constituent Categories
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedConstituent ? 'Edit Constituent' : 'Add New Constituent'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            fullWidth
            value={newConstituent.name}
            onChange={handleNewConstituentChange('name')}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newConstituent.email}
            onChange={handleNewConstituentChange('email')}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={newConstituent.phone}
            onChange={handleNewConstituentChange('phone')}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            multiline
            rows={2}
            value={newConstituent.address}
            onChange={handleNewConstituentChange('address')}
          />
          <TextField
            margin="dense"
            label="District"
            fullWidth
            value={newConstituent.district}
            onChange={handleNewConstituentChange('district')}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={newConstituent.category}
              onChange={handleNewConstituentChange('category')}
              label="Category"
            >
              <MenuItem value="Regular Contact">Regular Contact</MenuItem>
              <MenuItem value="Community Leader">Community Leader</MenuItem>
              <MenuItem value="Business Owner">Business Owner</MenuItem>
              <MenuItem value="Advocate">Advocate</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Interests"
            fullWidth
            placeholder="Enter interests separated by commas"
            value={newConstituent.interests}
            onChange={handleNewConstituentChange('interests')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddConstituent} variant="contained">
            {selectedConstituent ? 'Save Changes' : 'Add Constituent'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ConstituentsTab; 