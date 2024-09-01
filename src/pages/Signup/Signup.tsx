import React, { useState } from 'react';
import api from "../api/api";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2'; 
import "./Signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);


  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (username: string, password: string, confirmPassword: string) => {
      try {
      const response = await api.post("/register", {
        username,
        password,
        confirmPassword
      });
      if (response) {
        console.log("Signed Up successfully!");
        const userId = response.data.userId;
        navigate(`/task-manager?userId=${userId}`);
      } else {
        console.log("Error in signing up!");
      }
    } catch (error) {
      console.error("Error in Signup.tsx:- ", (error as Error).message);
    }
  };

  return (
    <Box className="main-signup-container">
      <Box className="signup-section">
        <Grid container direction="column" spacing={2} alignItems="center" className="main-grid-container">
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Welcome,
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Sign up to continue!
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '100%', boxSizing: 'border-box' }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '100%', boxSizing: 'border-box' }}>
            <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '100%', boxSizing: 'border-box' }}>
            <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPassword2 ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ minWidth: '100%', boxSizing: 'border-box' }}>
            <Button className='signup-button' onClick={() => handleSubmit(username, password, confirmPassword)}>
              Sign Up
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              I'm already a user,{' '}
              <Link to="/login" style={{ color: '#FF7B7B', textDecoration: 'none' }}>
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
