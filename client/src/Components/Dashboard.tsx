"use client"
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export function Dashboard() {
  return (
    <Grid container spacing={3} style={{ padding: 24 }}>
      
      {/* Currently Reading Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Currently Reading</Typography>
            <Typography variant="body2" color="textSecondary">
              View the books you are currently reading and track your progress.
            </Typography>
            {/* Add more content here, like a list of books */}
          </CardContent>
        </Card>
      </Grid>

      {/* Books I've Read Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Books I've Read</Typography>
            <Typography variant="body2" color="textSecondary">
              A list of books you have completed. Rate and review them here.
            </Typography>
            {/* Add content like a list of books with ratings */}
          </CardContent>
        </Card>
      </Grid>

      {/* Wishlist Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Wishlist</Typography>
            <Typography variant="body2" color="textSecondary">
              Books you plan to buy or read next.
            </Typography>
            {/* Add a list or grid of wishlist items */}
          </CardContent>
        </Card>
      </Grid>

      {/* Recommendations Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Recommendations</Typography>
            <Typography variant="body2" color="textSecondary">
              Personalized book recommendations based on your reading history.
            </Typography>
            {/* Add a carousel or list of recommended books */}
          </CardContent>
        </Card>
      </Grid>

      {/* Reading Stats Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Reading Stats</Typography>
            <Typography variant="body2" color="textSecondary">
              Track your reading habits, goals, and progress over time.
            </Typography>
            {/* Add charts or stats summaries */}
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>
  );
}

export default Dashboard;
