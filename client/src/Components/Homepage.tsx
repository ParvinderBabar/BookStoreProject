import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Grid,
  Card,
  
  CardMedia,
  Typography,
  
  
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link as MuiLink } from '@mui/material';
import { Box } from '@mui/system';

function Homepage() {
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
          />
          <IconButton type="submit" sx={{ padding: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Toolbar>
          </AppBar>


          <Box sx={{ flexGrow: 1, padding: 2 }}>
              <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#000000' }}>
                  <Toolbar>
                       <MuiLink href="#" underline="hover" color="primary" sx={{ display: 'block', marginY: 1 }}>
        books
      </MuiLink>
      <MuiLink href="/internal-page" underline="none" color="secondary" sx={{ display: 'block', marginY: 1 }}>
        yourBooks
              </MuiLink>
              <MuiLink href="/internal-page" underline="none" color="secondary" sx={{ display: 'block', marginY: 1 }}>
        Browse
      </MuiLink>
               </Toolbar>
                 
              </AppBar>
     
      
    </Box>
          

   

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
          <Box>
               {/* Editors' Choice Section */}
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
               {/* Editors' Choice Section */}
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
               {/* Editors' Choice Section */}
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
               {/* Editors' Choice Section */}
      <Typography variant="h6" sx={{ marginY: 2 }}>
        Best Kid's books of month
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
  );
}

export default Homepage;
