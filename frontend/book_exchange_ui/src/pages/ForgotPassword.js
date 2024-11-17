import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Box, 
    Alert 
} from '@mui/material';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to send reset email');
            }

            setSuccess('Password reset email sent successfully');
            setError(null);
        } catch (error) {
            setError('Failed to send reset email, please try again.');
            setSuccess(null);
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
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleForgotPassword} style={{ width: '100%' }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                {success}
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Send Reset Email
                        </Button>
                    </form>
                </Box>
            </Container>
        </Box>
    );
}

export default ForgotPassword;