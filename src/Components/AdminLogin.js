import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding:"5%",
        paddingTop:0,
        paddingBottom:0
      }}
    >
      <Paper elevation={5} sx={{ p: 4, maxWidth: '400px', width: '100%' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email or Admin ID"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{
                backgroundColor: '#ac2642',
                '&:hover': {
                  backgroundColor: '#d85165',
                },
                width: '100%',
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default AdminLogin;
