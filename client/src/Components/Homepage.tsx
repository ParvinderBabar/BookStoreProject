import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as MuiLink } from '@mui/material';
import SearchBooks from '../Components/Search'; // Import the SearchBooks component

function Homepage() {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page when the icon is clicked
  };

  // Trigger search whenever searchTerm is updated
  useEffect(() => {
    // Optional: Add a debounce here if you want to limit how often the search is triggered
    // You can fetch data or update UI based on the searchTerm here.
  }, [searchTerm]); // Effect runs whenever searchTerm changes

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
            onChange={(e) => setSearchTerm(e.target.value)} // Trigger search on input change
          />
          <IconButton sx={{ padding: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton onClick={handleLoginClick} sx={{ padding: '10px' }} aria-label="go to login">
            <AccountCircle fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* SearchBooks Component to Display Search Results */}
      {searchTerm && <SearchBooks searchTerm={searchTerm} />} 

      {/* Rest of the Homepage content */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#000000' }}>
          <Toolbar>
            <MuiLink href="#" underline="hover" color="primary" sx={{ display: 'block', marginY: 1 }}>
              Books
            </MuiLink>
            <MuiLink href="/login" underline="none" color="secondary" sx={{ display: 'block', marginY: 1 }}>
              Your Books
            </MuiLink>
            <MuiLink href="/internal-page" underline="none" color="secondary" sx={{ display: 'block', marginY: 1 }}>
              Browse
            </MuiLink>
          </Toolbar>
        </AppBar>

        {/* Best Sellers Section */}
        <Typography variant="h6" sx={{ marginY: 2 }}>
          Best Sellers
        </Typography>
        <Grid container spacing={2}>
          {[1].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`/bestbooks2024.jpg`}
                  alt={`Book ${item}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Other sections */}
        <Box>
          {/* Editor's Choice Section */}
          <Typography variant="h6" sx={{ marginY: 2 }}>
            Editor's Choice
          </Typography>
          <Grid container spacing={2}>
            {[2].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/bestbooks2024.jpg`}
                    alt={`Book ${item}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Best Kid's books of the month */}
          <Typography variant="h6" sx={{ marginY: 2 }}>
            Best Kid's Books of the Month
          </Typography>
          <Grid container spacing={2}>
            {[2].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/bestbooks2024.jpg`}
                    alt={`Book ${item}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Homepage;
