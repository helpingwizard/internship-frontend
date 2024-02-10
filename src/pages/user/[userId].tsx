import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Router, useRouter } from 'next/router';




export default function SignUp() {
    const router = useRouter();
    
    const {userId} = router.query;

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userName, setuserName]= React.useState("");

    



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };



  

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Modify User Data
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e)=>{
                    setuserName(e.target.value);
                  }}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e)=>{
                    setPassword(e.target.value);
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="text"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
            <Button
  onClick={async () => {
    try {
      const res = await axios.put(
        "https://backend3-mdfb.onrender.com/user/update/" + userId,
        {
          username: userName,
          email: email,
          password: password,
          name: name
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      alert("User Updated Successfully");
      router.push("/list");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again later.");
    }
  }}
  fullWidth
  variant="contained"
  sx={{ mt: 3, mb: 2 }}
>
  Update User
</Button>



            

            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    
  );
}