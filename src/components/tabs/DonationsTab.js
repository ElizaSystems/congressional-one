import React, { useState } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Alert,
  Divider
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const cryptocurrencies = ['USDC', 'USDT'];
const walletAddress = '0x1234567890abcdef1234567890abcdef12345678';

// Sample donation data
const donationData = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 18000 },
  { month: 'Mar', amount: 15000 },
  { month: 'Apr', amount: 25000 },
  { month: 'May', amount: 22000 },
  { month: 'Jun', amount: 30000 },
];

function DonationsTab() {
  const [amount, setAmount] = useState('');
  const [crypto, setCrypto] = useState('USDC');
  const [showAlert, setShowAlert] = useState(false);

  const handleDonate = () => {
    // Here you would implement the actual donation logic
    // For now, we'll just show a success message
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Support Our Work with Cryptocurrency Donations
        </Typography>
        <Typography variant="body1" paragraph>
          Your contributions help us better serve our constituents and community.
          We accept donations in USDC and USDT.
        </Typography>
      </Grid>
      
      {showAlert && (
        <Grid item xs={12}>
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            Thank you for your donation! Please send {amount} {crypto} to the wallet address below.
          </Alert>
        </Grid>
      )}
      
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Make a Donation
          </Typography>
          
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="crypto-select-label">Cryptocurrency</InputLabel>
              <Select
                labelId="crypto-select-label"
                value={crypto}
                label="Cryptocurrency"
                onChange={(e) => setCrypto(e.target.value)}
              >
                {cryptocurrencies.map((coin) => (
                  <MenuItem key={coin} value={coin}>{coin}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={handleDonate}
              disabled={!amount}
            >
              Donate
            </Button>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Wallet Address:
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ p: 2, bgcolor: '#f5f5f5', wordBreak: 'break-all' }}
            >
              <Typography variant="body2" fontFamily="monospace">
                {walletAddress}
              </Typography>
            </Paper>
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ mt: 1 }}
              onClick={() => navigator.clipboard.writeText(walletAddress)}
            >
              Copy Address
            </Button>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Donation History
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={donationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Bar dataKey="amount" name="Donations ($)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DonationsTab; 