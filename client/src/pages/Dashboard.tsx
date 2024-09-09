"use client";
import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, Typography, Drawer, List, ListItemButton, ListItemText, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BookCard from './BookCard'; // Import the BookCard component
import './Dashboard.css';

export function Dashboard() {
  const [selectedSection, setSelectedSection] = useState('Currently Reading');

  const handleMenuItemClick = (section: string) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'Currently Reading':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <BookCard title="The Pragmatic Programmer" author="Andrew Hunt and David Thomas" bookId="1" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <BookCard title="Clean Code" author="Robert C. Martin" bookId="2" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <BookCard title="Atomic Habits" author="James Clear" bookId="3" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <BookCard title="The Art of Computer Programming" author="Donald Knuth" bookId="4" />
            </Grid>
             <Grid item xs={12} sm={6} md={4} lg={3}>
              <BookCard title="The Art of Computer Programming" author="Donald Knuth" bookId="4" />
            </Grid>
             <Grid item xs={12} sm={6} md={4} lg={3}>
              <BookCard title="The Art of Computer Programming" author="Donald Knuth" bookId="4" />
            </Grid>
             <Grid item xs={12} sm={6} md={4} lg={3}>
              <BookCard title="The Art of Computer Programming" author="Donald Knuth" bookId="4" />
            </Grid>
             <Grid item xs={12} sm={6} md={4} lg={3}>
              <BookCard title="The Art of Computer Programming" author="Donald Knuth" bookId="4" />
            </Grid>
          </Grid>
        );
      case 'Books I\'ve Read':
        return <Typography>Books I've Read content here</Typography>;
      case 'Wishlist':
        return <Typography>Wishlist content here</Typography>;
      case 'Recommendations':
        return <Typography>Recommendations content here</Typography>;
      case 'Reading Stats':
        return <Typography>Reading Stats content here</Typography>;
      default:
        return <Typography>Select a section from the menu</Typography>;
    }
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
      <main style={{ flexGrow: 1, padding: '24px 32px',marginLeft:'250px' }}>
        <AppBar position="static" style={{ marginBottom: '24px', backgroundColor: '#546e7a' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" style={{ marginRight: '16px' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {selectedSection}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {renderContent()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Dashboard;
