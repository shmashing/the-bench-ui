import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Container, Alert } from '@mui/material';


const UserComponent = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const initializeDatabase = async () => {
    const full_uri = 'http://localhost:5126/api/v1/user';
    try {
      await axios.get(full_uri);
      alert('Database initialized');
    } catch (err) {
      console.error(err);
      setError('Failed to initialize database');
    }
  };

  const getUserDetails = async () => {
    const base_uri = process.env.REACT_APP_API_URI;
    const full_uri = `${base_uri}/api/v1/user/${userId}`;
    
    try {
      const response = await axios.get(full_uri);
      setUser(response.data);
      console.log(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('User not found');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          User Details
        </Typography>
        <TextField
          label="Enter User Name or Id"
          variant="outlined"
          fullWidth
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={getUserDetails} fullWidth>
          Get User Details
        </Button>
        {user && (
          <Paper elevation={1} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6">User Details</Typography>
            <Typography>ID: {user.id}</Typography>
            <Typography>Name: {user.name}</Typography>
            <Typography>Sports: {user.sports.join(', ')}</Typography>
            <Typography>Availability: {user.availableTimes.join(', ')}</Typography>
          </Paper>
        )}
        {error && (
          <Alert severity="error" style={{ marginTop: '20px' }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default UserComponent;