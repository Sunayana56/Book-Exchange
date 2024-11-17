import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AutoStories } from '@mui/icons-material';

function Navbar({ isLoggedIn, onLogout, onSearch }) {
    // const categories = ['Fiction', 'Non-fiction', 'Mystery', 'Science', 'Fantasy'];
    // const categoryIcons = {
    //     Fiction: <MenuBook />,
    //     'Non-fiction': <LibraryBooks />,
    //     Mystery: <Search />,
    //     Science: <Science />,
    //     Fantasy: <AutoAwesome />,
    // };
    const [anchorEl, setAnchorEl] = useState(null); 
    const navigate = useNavigate();

    const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
    const handleAvatarClose = () => setAnchorEl(null);
    const handleLogout = () => {
        onLogout();
        handleAvatarClose(); 
    };

    return (
        <>
            {/* AppBar */}
            <AppBar position="sticky" sx={{ background: '#8f5407' }}>
                <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                     <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                        component={Link}
                        to="/home"
                    >
                        <AutoStories sx={{ marginLeft: 1 }} />
                        &nbsp;&nbsp;
                        <Typography variant="h6">Books Bridge</Typography>
                    </Box>

                    {isLoggedIn && (
                        <IconButton onClick={handleAvatarClick} sx={{ marginLeft: '8px' }}>
                            <Avatar alt="Profile" />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAvatarClose}
            >
                <MenuItem onClick={() => navigate('/account')}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
}

export default Navbar;
