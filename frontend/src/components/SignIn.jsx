import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginSocialGoogle } from 'reactjs-social-login';  

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('user', JSON.stringify({ email }));  
    onLogin(email);  
    navigate('/');   
  };


  const handleGoogleLogin = (response) => {
    const profile = response?.profileObj || response;
    const userData = {
      name: profile.name,
      email: profile.email,
      imageUrl: profile.imageUrl,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    onLogin(userData.email);  
    navigate('/');  
  };
  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    alert('Google login failed. Please try again.');
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '2rem', marginTop: '4rem' }} style={{ borderRadius: '30px', height: '510px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: '1.5rem', padding: '0.75rem' }}
          >
            Sign In
          </Button>

          <LoginSocialGoogle
            client_id="480403082542-t9bheigm1ckvmmgvm6op78s5h87namre.apps.googleusercontent.com"
            onResolve={handleGoogleLogin}
            onReject={handleGoogleFailure}
          >
            <Button variant="outlined" fullWidth sx={{ marginTop: '1rem', padding: '0.75rem' }} style={{ color: 'black' }}>
              Sign In with Google
            </Button>
          </LoginSocialGoogle>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;