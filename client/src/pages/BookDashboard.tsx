// import React, { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, IconButton, Tooltip, Grid, Card, CardMedia, CardContent, Button, CircularProgress, Container } from '@mui/material';
// import axios from 'axios';
// import { FaSearch } from 'react-icons/fa';
// import AuthContext from '../contexts/AuthContext';

// export interface Book {
//   id: string;
//   shelf: 'wantToRead' | 'currentlyReading' | 'read';
//   title: string;
//   authors?: string[];
//   imageLinks?: { thumbnail?: string };
// }

// export interface Shelf {
//   wantToRead: Book[];
//   currentlyReading: Book[];
//   read: Book[];
// }

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// const BookDashboard: React.FC = () => {
//   const { signOut } = useAuth();
//   const [books, setBooks] = useState<Shelf>({ wantToRead: [], currentlyReading: [], read: [] });
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           throw new Error('No authentication token found');
//         }

//         const response = await axios.get('/api/bookshelf', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.data.books) {
//           setBooks(response.data.books);
//         } else {
//           throw new Error('Books data not found in response');
//         }

//       } catch (err) {
          
//           if (err instanceof Error) {
            
//           setError(`Error fetching data: ${err.message}`);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography variant="h6" color="error">{error}</Typography>;

//   const renderBooksByShelf = (shelf: keyof Shelf) => (
//     <Grid container spacing={2}>
//       {books[shelf].map((book: Book) => (
//         <Grid item xs={12} sm={6} md={3} key={book.id}>
//           <Link to={`/book/${book.id}`}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={book.imageLinks?.thumbnail || '/default-image.jpg'}
//                 alt={book.title}
//               />
//               <CardContent>
//                 <Tooltip title={book.title} arrow>
//                   <Typography variant="h6" noWrap>{book.title}</Typography>
//                 </Tooltip>
//                 <Typography variant="body2" color="textSecondary">
//                   {book.authors?.join(", ")}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Link>
//         </Grid>
//       ))}
//     </Grid>
//   );

//   return (
//     <Container>
//       <AppBar position="static" color="success">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Bookshelf
//           </Typography>
//           <IconButton color="inherit" component={Link} to="/search">
//             <FaSearch />
//           </IconButton>
//           <Button color="inherit" onClick={signOut}>Sign Out</Button>
//         </Toolbar>
//       </AppBar>

//       <Typography variant="h4" align="center" sx={{ my: 5 }}>Currently Reading</Typography>
//       {renderBooksByShelf('currentlyReading')}

//       <Typography variant="h4" align="center" sx={{ my: 5 }}>Want to Read</Typography>
//       {renderBooksByShelf('wantToRead')}

//       <Typography variant="h4" align="center" sx={{ my: 5 }}>Read</Typography>
//       {renderBooksByShelf('read')}
//     </Container>
//   );
// };

// export default BookDashboard;
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Grid, Card, CardMedia, CardContent, CircularProgress,Drawer, List, ListItemButton, ListItemText, Divider, InputBase, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';  
import './BookDashboard.css'; // Import CSS file for styling

export interface Book {  
  id: string;  
  shelf: 'wantToRead' | 'currentlyReading' | 'read';  
  title: string;  
  authors?: string[];  
  imageLinks?: { thumbnail?: string };  
}  

export interface Shelf {  
  wantToRead: Book[];  
  currentlyReading: Book[];  
  read: Book[];  
}

const useAuth = () => {  
  const context = useContext(AuthContext);  
  if (context === undefined) {  
    throw new Error('useAuth must be used within an AuthProvider');  
  }  
  return context;  
};  

const BookDashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [books, setBooks] = useState<Shelf>({ wantToRead: [], currentlyReading: [], read: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<keyof Shelf>('currentlyReading');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchData = async () => {
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

        if (response.data.books) {
          setBooks(response.data.books);
        } else {
          throw new Error('Books data not found in response');
        }

      } catch (err) {
        if (err instanceof Error) {
          setError(`Error fetching data: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSection]);

  const handleMenuItemClick = (section: keyof Shelf) => {
    setSelectedSection(section);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    signOut();
    navigate('/login'); // Navigate to login page after sign out
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  const filteredBooks = books[selectedSection].filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <ListItemButton onClick={() => handleMenuItemClick('currentlyReading')}>
              <ListItemText primary="Currently Reading" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('wantToRead')}>
              <ListItemText primary="Want to Read" />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuItemClick('read')}>
              <ListItemText primary="Read" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '24px 32px', marginLeft: '240px' }}>
        <AppBar position="static" style={{ backgroundColor: '#546e7a', marginBottom: '24px' }}>
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
        </AppBar>
        <Typography variant="h4" align="center" sx={{ my: 5 }}>{selectedSection.replace(/([A-Z])/g, ' $1').trim()}</Typography>
        <Grid container spacing={3}>
          {filteredBooks.map((book: Book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card>
                <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={book.imageLinks?.thumbnail || '/default-image.jpg'}
                    alt={book.title}
                  />
                  <CardContent>
                    <Tooltip title={book.title} arrow>
                      <Typography variant="h6" noWrap>{book.title}</Typography>
                    </Tooltip>
                    <Typography variant="body2" color="textSecondary">
                      {book.authors?.join(", ")}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default BookDashboard;

