import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Alert,
    Checkbox,
    FormControlLabel,
    Chip,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

function AccountPage() {
    const [userDetails, setUserDetails] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        publisher: '',
        genre: '',
        language: '',
        publishYear: '',
        description: '',
        imagePath: '',
        location: '',
        isAvailable: false,
        lenderId: ''
    });
    const [editingBookId, setEditingBookId] = useState(null);

    const username = localStorage.getItem('username'); // Get username from localStorage

    useEffect(() => {
        if (username) {
            const fetchUserDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/book-bridge/users/${username}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to fetch user details');
                    }
    
                    const data = await response.json();
                    setUserDetails(data);
                } catch (err) {
                    setError('Failed to fetch user details');
                } finally {
                    setLoading(false);
                }
            };
    
            fetchUserDetails();
        } else {
            setError('No username found');
            setLoading(false);
        }
    }, [username]); 
    
    const fetchBooks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/book-bridge/books/lender/${userDetails.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            const data = await response.json();
            setBooks(data);
        } catch (err) {
            setError('Failed to fetch books');
        }
    };
   
    useEffect(() => {
        if (userDetails?.id) {
            fetchBooks();
        }
    }, [userDetails]); 

    const handleModalOpen = (book = null) => {
        setBookDetails(book || {
            title: '',
            author: '',
            publisher: '',
            genre: '',
            language: '',
            publishYear: '',
            description: '',
            imagePath: '',
            location: '',
            isAvailable: false,
            lenderId: ''
        });
        setEditingBookId(book?.id || null);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setBookDetails({
            title: '',
            author: '',
            publisher: '',
            genre: '',
            language: '',
            publishYear: '',
            description: '',
            imagePath: '',
            location: '',
            isAvailable: false,
            lenderId: ''
        });
        setEditingBookId(null);
    };

    const handleBookSave = async () => {
        const url = editingBookId
            ? `http://localhost:8080/book-bridge/books/${editingBookId}`
            : `http://localhost:8080/book-bridge/books`;

        const method = editingBookId ? 'PUT' : 'POST';
        bookDetails.lenderId = userDetails.id;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to save book');
            }

            fetchBooks();
            handleModalClose();
        } catch (err) {
            setError('Failed to save book');
        }
    };

    // Handle delete book
    const handleDeleteBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:8080/book-bridge/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            fetchBooks();
        } catch (err) {
            setError('Failed to delete book');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
            }}
        >
            <Avatar
                alt="User Profile"
                sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h4" gutterBottom>
                {userDetails.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {userDetails.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {userDetails.createdOn}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Edit Profile
            </Button>

            {/* Books Section */}
            <Box sx={{ mt: 4, width: '50%' }}>
                <Typography variant="h5" gutterBottom>
                    Your Listed Books
                </Typography>
                <List>
                    {books.map((book) => (
                        <ListItem
                            key={book.id}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" onClick={() => handleModalOpen(book)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDeleteBook(book.id)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText
                                primary={book.title}
                                secondary={`Author: ${book.author}`}
                            />
                            <Chip
                                label={book.available ? 'Available' : 'Unavailable'}
                                color={book.available ? 'success' : 'error'}
                                sx={{ ml: 2, marginRight: 7 }}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ mt: 2 }}
                    onClick={() => handleModalOpen()}
                >
                    Add New Book
                </Button>
            </Box>

            {/* Add/Edit Modal */}
            <Dialog open={modalOpen} onClose={handleModalClose}>
                <DialogTitle>{editingBookId ? 'Edit Book' : 'Add Book'}</DialogTitle>
                <DialogContent>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={bookDetails.title}
                        onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                    />
                    <TextField
                        label="Author"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={bookDetails.author}
                        onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                    />
                    <TextField
                        label="Publisher"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={bookDetails.publisher}
                        onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })}
                    />
                    <TextField
                        label="Genre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={bookDetails.genre}
                        onChange={(e) => setBookDetails({ ...bookDetails, genre: e.target.value })}
                    />
                    <TextField
                        label="Language"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={bookDetails.language}
                        onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })}
                    />
                    <TextField
                        label="Publish Year"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={bookDetails.publishYear}
                        onChange={(e) => setBookDetails({ ...bookDetails, publishYear: e.target.value })}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={bookDetails.description}
                        onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
                    />
                    <TextField
                        label="Image Path"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={bookDetails.imagePath}
                        onChange={(e) => setBookDetails({ ...bookDetails, imagePath: e.target.value })}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={bookDetails.location}
                        onChange={(e) => setBookDetails({ ...bookDetails, location: e.target.value })}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={bookDetails.isAvailable}
                                onChange={(e) => setBookDetails({ ...bookDetails, isAvailable: e.target.checked })}
                            />
                        }
                        label="Is Available"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleBookSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AccountPage;
