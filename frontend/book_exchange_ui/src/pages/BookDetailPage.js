import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BookDetailPage() {
    const { id } = useParams();  // Extract the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch book details on component mount
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/book-bridge/books/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setBook(data);  // Set the fetched book details
                setLoading(false);
            } catch (err) {
                setError(err.message);  // Handle any errors
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);  // Dependency on bookId to re-fetch when it changes

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Box 
            sx={{ 
                width: '100%', 
                minHeight: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundImage: 'url(/images/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center' }}>
            <Box sx={{ width: '60%', backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
            <Button 
                variant="text" 
                startIcon={<ArrowBackIcon />} 
                sx={{ marginBottom: 2 }} 
                onClick={() => window.history.back()}
            >
                Back
            </Button>
            <Typography variant="h4" gutterBottom>Book Details</Typography>
            <Divider sx={{ marginBottom: 1}} />
                {book && (
                    <Card>
                        <CardMedia
                            component="img"
                            sx={{
                                height: 400,
                                width: '100%',       // Full width
                                objectFit: 'contain' // Keeps the aspect ratio and fits the entire image inside the container
                            }}
                            image={book.imagePath}
                            alt={book.title}
                        />
                        <CardContent>
                            <Typography variant="h5">{book.title}</Typography>
                            <Typography variant="body1"><strong>Author:</strong> {book.author}</Typography>
                            <Typography variant="body1"><strong>Publisher:</strong> {book.publisher}</Typography>
                            <Typography variant="body1"><strong>Genre:</strong> {book.genre}</Typography>
                            <Typography variant="body1"><strong>Language:</strong> {book.language}</Typography>
                            <Typography variant="body1"><strong>Published Year:</strong> {book.publishYear}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ marginRight: 1 }}><strong>Description:</strong></Typography>
                                <Typography variant="body2">{book.description}</Typography>
                            </Box>
                            
                            <Button  variant="contained" 
                                    color="primary" 
                                    sx={{ 
                                        marginTop: 2, 
                                        width: '50%', 
                                        display: 'block', 
                                        marginLeft: 'auto', 
                                        marginRight: 'auto' 
                                    }}>
                                Send Exchange Request
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Box>
    );
}

export default BookDetailPage;
