import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as MuiLink } from '@mui/material';
import Search from '../Components/Search'; // Import the Search component

// Define the type for book items from the search results
interface BookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
    };
  };
}

function Homepage() {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [searchResults, setSearchResults] = useState<BookItem[]>([]); // State for search results
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for dropdown menu
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page when the icon is clicked
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleReadNowClick = (bookId: string) => {
    // Handle the "Read Now" button click
    navigate(`/book/${bookId}/read`);
  };

  const handleSearch = () => {
    // Trigger search in the Search component
    console.log("Searching for:", searchTerm);
    // You might want to implement the search functionality here
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* AppBar with Menu and Search */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#000000' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{ marginLeft: 1, flex: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
          <IconButton type="button" sx={{ padding: '10px' }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          {/* Account Icon Button */}
          <IconButton
            onClick={handleLoginClick}
            sx={{ padding: '10px' }}
            aria-label="go to login"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Search Component */}
      <Search searchTerm={searchTerm} onSearchResults={setSearchResults} />

      {/* Displaying Search Results */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {searchResults.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={book.volumeInfo.imageLinks?.thumbnail || '/default-book-image.jpg'}
                  alt={book.volumeInfo.title}
                />
                <CardContent>
                  <Typography variant="h6">{book.volumeInfo.title}</Typography>
                  <Typography variant="subtitle1">
                    {book.volumeInfo.authors.join(', ') || 'Unknown Author'}
                  </Typography>
                  <MuiLink href={`/book/${book.id}`} underline="hover" color="primary">
                    Show Details
                  </MuiLink>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 1 }}
                    onClick={() => handleReadNowClick(book.id)}
                  >
                    Read Now
                  </Button>
                  <IconButton
                    aria-label="settings"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleDropdownClick}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleDropdownClose}
                  >
                    <MenuItem onClick={handleDropdownClose}>Add to Bookshelf</MenuItem>
                    <MenuItem onClick={handleDropdownClose}>Mark as Read</MenuItem>
                    <MenuItem onClick={handleDropdownClose}>Favorite</MenuItem>
                  </Menu>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Homepage;
