import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Box,
    Pagination,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [availability, setAvailability] = useState('');
    const [genre, setGenre] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const booksPerPage = 12;

    // Fetch all books from the API
    const fetchAllBooks = async (page) => {
        try {
            const response = await fetch(`http://localhost:8080/book-bridge/books?page=${page - 1}&size=${booksPerPage}`);
            if (response.ok) {
                const data = await response.json();
                setAllBooks(data.content || []);
                setBooks(data.content || []);
                setTotalPages(data.totalPages || 0);
            } else {
                console.error('Failed to fetch books:', response.statusText);
            }
        } catch (error) {
            console.error('Error during book fetch:', error);
        }
    };

    const fetchBooks = async (page, query, filters) => {
        const { availability, genre, location } = filters;
        const params = new URLSearchParams();
    
        if (query) params.append('query', query);
        if (availability) params.append('available', availability);
        if (genre) params.append('genre', genre);
        if (location) params.append('location', location);
        params.append('page', page - 1);
        params.append('size', booksPerPage);
    
        try {
            const response = await fetch(`http://localhost:8080/book-bridge/books/search?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Filtered results:', data.content);
                setBooks(data.content || []);
                setTotalPages(data.totalPages || 0);
            } else {
                console.error('Failed to fetch books:', response.statusText);
            }
        } catch (error) {
            console.error('Error during book fetch:', error);
        }
    };

    const applyFilters = () => {
        fetchBooks(currentPage, searchQuery, { availability, genre, location });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setAvailability('');
        setGenre('');
        setLocation('');
        fetchBooks(1, '', {}); // Fetch without filters
    };

    const handleSearch = () => {
        const filteredBooks = allBooks.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setBooks(filteredBooks);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleCardClick = (bookId) => {
        navigate(`/book-detail/${bookId}`);
    };

    useEffect(() => {
        fetchAllBooks(currentPage);
    }, [currentPage]);

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                backgroundImage: 'url(/images/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '60%',
                    minHeight: '75vh',
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    All Books
                </Typography>

                {/* Search Bar */}
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="Search by Title, Author, or Genre"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={handleSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={clearFilters}>
                                        <CloseIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Filters */}
                <Typography variant="h6" marginBottom={1}>Filters</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    
                    <FormControl sx={{ width: '30%' }}>
                        <InputLabel>Availability</InputLabel>
                        <Select
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            label="Availability"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="true">Available</MenuItem>
                            <MenuItem value="false">Unavailable</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: '30%' }}>
                        <InputLabel>Genre</InputLabel>
                        <Select
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            label="Genre"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Fiction">Fiction</MenuItem>
                            <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                            <MenuItem value="Fantasy">Fantasy</MenuItem>
                            <MenuItem value="Science">Science</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Location"
                        variant="outlined"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ width: '30%' }}
                    />
                </Box>

                <Grid container spacing={1} marginBottom='20px' justifyContent="center">
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
                            Apply Filters
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="secondary" onClick={clearFilters} fullWidth>
                            Clear Filters
                        </Button>
                    </Grid>
                </Grid>

                {/* Books Grid */}
                <Grid container spacing={3}>
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <Card onClick={() => handleCardClick(book.id)}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 200,
                                        width: '100%',
                                        objectFit: 'contain',
                                    }}
                                    image={book.imagePath}
                                    alt={book.title}
                                />
                                <CardContent>
                                    <Typography variant="h7">{book.title}</Typography>
                                    <Typography variant="body2">{book.author}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;
