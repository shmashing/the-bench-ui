import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, Select, MenuItem, Button, FormControl, InputLabel, Alert } from '@mui/material';

const sports = ['Softball', 'Kickball', 'Pickleball'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeWindows = ['Morning', 'Afternoon', 'Evening'];

const SearchComponent = () => {
  const [sport, setSport] = useState(sports[0]);
  const [day, setDay] = useState(days[0]);
  const [time, setTime] = useState(timeWindows[0]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const searchUsers = async () => {
    const base_uri = process.env.REACT_APP_API_URI
    const full_uri = `${base_uri}/api/v1/search`;
    try {
      const response = await axios.get(full_uri, {
        params: { sport, day, time }
      });
      setUsers(response.data);
      console.info(response.data);
      setError('');
    } catch (err) {
      console.error(`failed to search users. Params: ${sport}, ${day}, ${time} ` + err.message);
      setError('Failed to search users');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Search Users
        </Typography>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Sport</InputLabel>
          <Select value={sport} onChange={(e) => setSport(e.target.value)} label="Sport">
            {sports.map((sport) => (
              <MenuItem key={sport} value={sport}>
                {sport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Day</InputLabel>
          <Select value={day} onChange={(e) => setDay(e.target.value)} label="Day">
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Time</InputLabel>
          <Select value={time} onChange={(e) => setTime(e.target.value)} label="Time">
            {timeWindows.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={searchUsers} fullWidth>
          Search
        </Button>
        {users.length > 0 && (
          <Paper elevation={1} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6">Search Results</Typography>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
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

export default SearchComponent;