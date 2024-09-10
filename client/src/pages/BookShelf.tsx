import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, Typography, Drawer, List, ListItemButton, ListItemText, Divider, IconButton, InputBase, Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './BookShelf.css';

interface Book {
  id: string;
  title: string;
  imageLinks?: {
    thumbnail?: string;
  };
  authors?: string[];
}

export function Dashboard() {
  const [selectedSection, setSelectedSection] = useState('Currently Reading');
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null); // State to hold user information
  const navigate = useNavigate(); // Initialize useNavigate for navigation


  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const userResponse = await axios.get('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
              setUser(userResponse.data.user);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Error fetching user: ${err.message}`);
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) {
      setError('You must be logged in to view this page.');
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('/api/bookshelf', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setBooks(response.data.books);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Error fetching data: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [selectedSection, user]);

  const handleMenuItemClick = (section: string) => {
    setSelectedSection(section);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login'); // Navigate to login page after sign out
  };

  const renderBooks = () => {
    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card>
              <CardContent>
                <a href={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                  <Tooltip title={book.title} placement="bottom">
                    <img src={book.imageLinks?.thumbnail} alt={book.title} style={{ width: '100%' }} />
                  </Tooltip>
                </a>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2">{book.authors?.join(', ')}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Drawer
        variant="permanent"
        PaperProps={{
          style: {
            width: 240,
            backgroundColor: '#263238',
            color: '#ffffff',
          },
        }}
      >
        <div style={{ padding: '16px 24px' }}>
          <Typography variant="h6">Dashboard Menu</Typography>
          <Divider style={{ backgroundColor: '#ffffff', margin: '16px 0' }} />
          <List>
            <ListItemButton onClick={() => handleMenuItemClick('Currently Reading')}>
              <ListItemText primary="Currently Reading" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('Books I\'ve Read')}>
              <ListItemText primary="Books I've Read" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('Wishlist')}>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('Recommendations')}>
              <ListItemText primary="Recommendations" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('Reading Stats')}>
              <ListItemText primary="Reading Stats" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '24px 32px', marginLeft: '240px' }}>
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
            onChange={handleSearchChange}
          />
          <IconButton sx={{ padding: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="sign out" onClick={handleSignOut}>
            Sign Out
          </IconButton>
        </Toolbar>
        <AppBar position="static" style={{ marginBottom: '24px', backgroundColor: '#546e7a' }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {selectedSection}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {renderBooks()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Dashboard;
