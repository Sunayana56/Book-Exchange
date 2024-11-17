// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Box, 
    Alert, 
    Link as MuiLink 
} from '@mui/material';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            // Store the JWT token in localStorage
            // localStorage.setItem('authToken', data.token);
            onLogin(data.token, username);

            // Redirect to account page or wherever needed
            navigate('/account');
        } catch (error) {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: 'url(/images/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
            <Container maxWidth="xs" sx={{ mt: 8 }}>
                <Box 
                    sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        backgroundColor: '#f9f9f9', 
                        padding: '2rem', 
                        borderRadius: '8px', 
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Don't have an account?{' '}
                        <MuiLink component={Link} to="/create-account">
                            Create Account
                        </MuiLink>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Login;
