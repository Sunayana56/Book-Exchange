import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Box, 
    Alert, 
    Link as MuiLink 
} from '@mui/material';

function CreateAccount() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Password must be at least 8 characters long and contain at least one number and one special character
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Required fields check
        if (!formData.username || !formData.email || !formData.password) {
            setError('All fields are required!');
            return;
        }

        // Email validation
        if (!validateEmail(formData.email)) {
            setError('Invalid email format');
            return;
        }

        // Password validation
        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters long and contain at least one number and one special character');
            return;
        }

        // Validation: Password and Confirm Password check
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Clear any previous errors
        setError(null);

        try {
            // Making the API call to create a user
            const response = await axios.post('http://localhost:8080/auth/create', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            // Success response: Redirect to login page
            if (response.status === 201) {
                navigate('/login'); // Navigate to login page
            }
        } catch (err) {
            // Handling error
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Error creating account. Please try again.');
            } else {
                setError('Error creating account. Please try again.');
            }
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
            }}>           
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
                        Create Account
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
                            Create Account
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Already have an account?{' '}
                        <MuiLink component={Link} to="/login">
                            Login
                        </MuiLink>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default CreateAccount;