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
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

function AccountPage() {
    const [userDetails, setUserDetails] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [bookDetails, setBookDetails] = useState({ title: '', author: '' });
    const [editingBookId, setEditingBookId] = useState(null);

    const username = localStorage.getItem('username'); // Get username from localStorage

    // Fetch user details
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

    // Fetch books added by the user
    const fetchBooks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/books/user/${username}`, {
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
        if (username) fetchBooks();
    }, [username]);

    // Handle add/edit book modal
    const handleModalOpen = (book = null) => {
        setBookDetails(book || { title: '', author: '' });
        setEditingBookId(book?.id || null);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setBookDetails({ title: '', author: '' });
        setEditingBookId(null);
    };

    const handleBookSave = async () => {
        const url = editingBookId
            ? `http://localhost:8080/api/books/${editingBookId}`
            : `http://localhost:8080/api/books`;

        const method = editingBookId ? 'PUT' : 'POST';

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
            const response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
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
            <Box sx={{ mt: 4, width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Your Books
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
