import React, { useState } from 'react';
import {
  Alert,
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
import { Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid2'; 
import "./Login.css"
import api from "../api/api"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noResult, setnoResult] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event:any) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleSubmit = async (username:string, password:string)=>{

    try {
      const response = await api.post("/check-user", {
        username,
        password,
        
      })
      if (response.data.userId) {
        console.log("User Exists!");
        const userId = response.data.userId;
        
        navigate(`/task-manager?userId=${userId}`);
      } else {
        console.log("Error in loging in!");
        setnoResult(true);

      }

      
    } catch (error) {
      console.error("Error in login.tsx:- ", (error as Error).message);
      setnoResult(true);


    }
  }

  return (
    <Box className="main-login-container">
      <Box className="login-section">
        <Grid container direction="column" spacing={2} alignItems="center" className="main-grid-container">
        <Grid xs={12} component="div">            
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Welcome,
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Sign in to continue!
            </Typography>
          </Grid>

          <Grid xs={12} sx={{
    minWidth: '100%', 
    boxSizing: 'border-box'
  }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
          </Grid>

          <Grid xs={12}  sx={{
    minWidth: '100%', 
    boxSizing: 'border-box'
  }}>
            <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
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

          <Grid xs={12} sx={{
    minWidth: '100%', 
    boxSizing: 'border-box'
  }}>
            <Button

            className='login-button'
            onClick={()=>handleSubmit(username, password)}
            
            >
              Login
            </Button>
            {noResult && (
              <Alert variant="outlined" severity="error" sx={{marginTop: "2px"}}>
              Incorrect Login credentials, please try again!
            </Alert>
            )}
          </Grid>

         

          <Grid xs={12}>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              I'm a new user,{' '}
              <Link to="/signup" style={{ color: '#FF7B7B', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
