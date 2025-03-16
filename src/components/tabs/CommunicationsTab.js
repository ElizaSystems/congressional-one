import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

function CommunicationsTab() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Communications
          </Typography>
          <Typography variant="body1">
            Communications features coming soon...
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CommunicationsTab; 