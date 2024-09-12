import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import {
  Button,
  
  CardMedia,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
  AppBar,
  Toolbar,
  InputBase,
  Tooltip,
  Container,
  Box,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import { MoreVert as MoreVertIcon, Delete as DeleteIcon } from '@mui/icons-material';

export interface Book {
  id: string;
  shelf: 'wantToRead' | 'currentlyReading' | 'read';
  title: string;
  authors?: string[];
  imageLinks?: { thumbnail?: string };
  publisher?: string;
  publishedDate?: string;
  categories?: string[];
  description?: string;
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const BookDetails: React.FC = () => {
  const { signOut } = useAuth();
  const { bookId } = useParams<{ bookId: string }>(); // Retrieve bookId from URL params
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!bookId) {
      setError('Book ID is missing');
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(`/api/book/${bookId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data.book) {
          setBook(response.data.book);
        } else {
          throw new Error('Book data not found in response');
        }
      } catch (err) {
        setError(`Error fetching data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const updateShelf = async (shelf: 'wantToRead' | 'currentlyReading' | 'read') => {
    if (!book) return;
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("No authentication token found");

      const response = await axios.put(`/api/bookshelf/${book.id}/${shelf}`, { shelf }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setBook({ ...book, shelf });
      } else {
        console.error("Error updating shelf:", response.statusText);
      }
    } catch (err) {
      console.error("Error updating shelf:", err);
    }
  };

  const removeBook = async () => {
    if (!window.confirm("Are you sure you want to remove this book from the shelf?")) return;

    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');

      await axios.delete(`/api/bookshelf/${bookId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/bookdashboard');
    } catch (err) {
      setError(`Error deleting book: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;
  if (!book) return <div>No book details available</div>;

  return (
    <Container maxWidth="lg" >
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/bookdashboard">Bookshelf</Button>
          <Box sx={{ flexGrow: 1 }} bgcolor='#2c3e50' />
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{ marginLeft: 1, flex: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Tooltip title="Sign Out">
            <IconButton color="inherit" onClick={signOut}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <CardMedia
                component="img"
                height="300"
                image={book.imageLinks?.thumbnail || ''}
                alt={book.title}
                sx={{ borderRadius: 1, marginBottom: 2 }}
              />
              <Button
                aria-controls={open ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleMenuClick}
                variant="outlined"
                sx={{ marginBottom: 2 }}
              >
                {book.shelf ? book.shelf.replace(/([A-Z])/g, ' $1').trim() : "Select Shelf"}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => { updateShelf("wantToRead"); handleMenuClose(); }}>Want To Read</MenuItem>
                <MenuItem onClick={() => { updateShelf("currentlyReading"); handleMenuClose(); }}>Currently Reading</MenuItem>
                <MenuItem onClick={() => { updateShelf("read"); handleMenuClose(); }}>Read</MenuItem>
              </Menu>
              <IconButton color="error" onClick={removeBook}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>{book.title}</Typography>
              <Typography variant="subtitle1" gutterBottom>Authors: {book.authors?.join(", ")}</Typography>
              <Typography variant="subtitle1" gutterBottom>Publisher: {book.publisher || 'N/A'}</Typography>
              <Typography variant="subtitle1" gutterBottom>Date Published: {book.publishedDate || 'N/A'}</Typography>
              <Typography variant="subtitle1" gutterBottom>Categories: {book.categories?.join(", ") || 'N/A'}</Typography>
              <Divider sx={{ margin: '20px 0' }} />
              <Typography variant="body2" paragraph>{book.description}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BookDetails;
