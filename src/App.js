import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Dashboard from './components/Dashboard';
import Agent from './components/Agent';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [agentMessages, setAgentMessages] = useState([]);
  const [userRequest, setUserRequest] = useState('');

  const handleAgentInteraction = (message) => {
    setAgentMessages([...agentMessages, { sender: 'user', text: message }]);
    // Simulate agent response
    setTimeout(() => {
      setAgentMessages([...agentMessages, 
        { sender: 'user', text: message },
        { sender: 'agent', text: `I've processed your request: "${message}"` }
      ]);
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Dashboard />
        <Agent 
          messages={agentMessages}
          userRequest={userRequest}
          setUserRequest={setUserRequest}
          onSendRequest={handleAgentInteraction}
        />
      </div>
    </ThemeProvider>
  );
}

export default App; 