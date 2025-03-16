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
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Info as InfoIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample budget data
const budgetData = {
  total: 1500000,
  spent: 850000,
  remaining: 650000,
  categories: {
    'Staff Salaries': { allocated: 800000, spent: 500000 },
    'Office Operations': { allocated: 300000, spent: 180000 },
    'Travel': { allocated: 150000, spent: 80000 },
    'Constituent Services': { allocated: 150000, spent: 60000 },
    'Communications': { allocated: 100000, spent: 30000 }
  }
};

// Sample expense data
const expenseData = [
  { id: 1, date: '2024-03-01', category: 'Staff Salaries', description: 'Monthly Staff Payroll', amount: 65000 },
  { id: 2, date: '2024-03-05', category: 'Office Operations', description: 'Office Supplies', amount: 2500 },
  { id: 3, date: '2024-03-10', category: 'Travel', description: 'District Travel Expenses', amount: 3500 },
  { id: 4, date: '2024-03-15', category: 'Communications', description: 'Newsletter Printing', amount: 1500 }
];

// Monthly spending data for chart
const monthlySpendingData = [
  { month: 'Jan', amount: 120000 },
  { month: 'Feb', amount: 115000 },
  { month: 'Mar', amount: 125000 },
  { month: 'Apr', amount: 118000 },
  { month: 'May', amount: 122000 },
  { month: 'Jun', amount: 119000 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function BudgetTab() {
  const [openDialog, setOpenDialog] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: ''
  });

  const handleNewExpenseChange = (prop) => (event) => {
    setNewExpense({ ...newExpense, [prop]: event.target.value });
  };

  const handleAddExpense = () => {
    // Here you would typically add the expense to your database
    setOpenDialog(false);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      category: '',
      description: '',
      amount: ''
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculatePercentage = (spent, allocated) => {
    return (spent / allocated) * 100;
  };

  return (
    <Grid container spacing={3}>
      {/* Budget Overview */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Budget Overview</Typography>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                sx={{ mr: 1 }}
              >
                Add Expense
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
              >
                Export Report
              </Button>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                <Typography variant="subtitle2" color="textSecondary">Total Budget</Typography>
                <Typography variant="h4">{formatCurrency(budgetData.total)}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                <Typography variant="subtitle2" color="textSecondary">Spent</Typography>
                <Typography variant="h4" color="error">{formatCurrency(budgetData.spent)}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                <Typography variant="subtitle2" color="textSecondary">Remaining</Typography>
                <Typography variant="h4" color="success.main">{formatCurrency(budgetData.remaining)}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Category Breakdown */}
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Budget Categories</Typography>
          {Object.entries(budgetData.categories).map(([category, data]) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{category}</Typography>
                <Typography variant="body2">
                  {formatCurrency(data.spent)} / {formatCurrency(data.allocated)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={calculatePercentage(data.spent, data.allocated)}
                sx={{ height: 8, borderRadius: 5 }}
              />
            </Box>
          ))}
        </Paper>
      </Grid>

      {/* Monthly Spending Chart */}
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>Monthly Spending</Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySpendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip
                  formatter={(value) => formatCurrency(value)}
                />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Recent Expenses */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Recent Expenses</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenseData.map((expense) => (
                  <TableRow key={expense.id} hover>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell align="right">{formatCurrency(expense.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Add Expense Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={newExpense.date}
            onChange={handleNewExpenseChange('date')}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={newExpense.category}
              onChange={handleNewExpenseChange('category')}
              label="Category"
            >
              {Object.keys(budgetData.categories).map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newExpense.description}
            onChange={handleNewExpenseChange('description')}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newExpense.amount}
            onChange={handleNewExpenseChange('amount')}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddExpense} variant="contained">Add Expense</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default BudgetTab; 