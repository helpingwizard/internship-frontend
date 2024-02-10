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
import { useSetRecoilState } from 'recoil';
import { userState } from '@/store/atom/user';
import { userNameState } from '@/store/selector/cred';
import axios from 'axios';
import Router, { useRouter } from "next/router";

export default function SignUp() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    
    const setName1 = useSetRecoilState(userState);
    const router = useRouter();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateName = (name:any) => {
        if (!name || name.length === 0) {
            setNameError("Name is required");
            return false;
        } else if (name.length > 30) {
            setNameError("Name should be maximum 30 characters long");
            return false;
        } else {
            setNameError("");
            return true;
        }
    };

    const validateEmail = (email:any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || email.length === 0) {
            setEmailError("Email is required");
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Invalid email address");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);

        if (isNameValid && isEmailValid) {
            const res = await axios.post("https://backend3-mdfb.onrender.com/user/signup", {
                username: userName,
                email: email,
                password: password,
                name: name
            });
            router.push("/loggedInPg");
            setName1({
                isLoading: false,
                name: name
            });
        }
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                <Typography component="h1" variant="h5">User Sign up</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setName(e.target.value)}
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={!!nameError}
                                helperText={nameError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="Username"
                                label="Username"
                                name="Username"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type='email'
                                error={!!emailError}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={showPassword} onChange={handleShowPassword} color="primary" />}
                                label="Show Password"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/adminAuth" variant="body2">Admin login</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
