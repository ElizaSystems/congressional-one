import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Paper, 
  Container 
} from '@mui/material';
import CaseworkTab from './tabs/CaseworkTab';
import LegislationTab from './tabs/LegislationTab';
import ScheduleTab from './tabs/ScheduleTab';
import ConstituentsTab from './tabs/ConstituentsTab';
import DonationsTab from './tabs/DonationsTab';
import BudgetTab from './tabs/BudgetTab';
import CommunicationsTab from './tabs/CommunicationsTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Dashboard() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ p: 2, borderBottom: '1px solid #eee' }}>
          Congressional Staff Dashboard
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange} 
            aria-label="dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Casework" />
            <Tab label="Legislation" />
            <Tab label="Schedule" />
            <Tab label="Constituents" />
            <Tab label="Budget" />
            <Tab label="Communications" />
            <Tab label="Donations" />
          </Tabs>
        </Box>
        
        <TabPanel value={currentTab} index={0}>
          <CaseworkTab />
        </TabPanel>
        
        <TabPanel value={currentTab} index={1}>
          <LegislationTab />
        </TabPanel>
        
        <TabPanel value={currentTab} index={2}>
          <ScheduleTab />
        </TabPanel>
        
        <TabPanel value={currentTab} index={3}>
          <ConstituentsTab />
        </TabPanel>
        
        <TabPanel value={currentTab} index={4}>
          <BudgetTab />
        </TabPanel>
        
        <TabPanel value={currentTab} index={5}>
          <CommunicationsTab />
        </TabPanel>
        
        <TabPanel value={currentTab} index={6}>
          <DonationsTab />
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default Dashboard; 