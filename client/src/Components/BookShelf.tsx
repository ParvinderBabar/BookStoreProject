import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography} from '@mui/material';
import BookCard from '../pages/BookCard'; // Assuming this component exists for displaying individual books

interface Book {
  id: string;
  title: string;
  shelf: string;
}

interface BookshelfData {
  wantToRead: Book[];
  currentlyReading: Book[];
  read: Book[];
}

const Bookshelf: React.FC = () => {
  const [bookshelf, setBookshelf] = useState<BookshelfData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookshelf = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
        const response = await axios.get('/api/bookshelf', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookshelf(response.data.books);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Failed to load bookshelf data.');
      }
    };

    fetchBookshelf();
  }, []);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!bookshelf) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Currently Reading</Typography>
      <Grid container spacing={3}>
        {bookshelf.currentlyReading.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard title={book.title} bookId={book.id} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" style={{ marginTop: '20px' }}>Want to Read</Typography>
      <Grid container spacing={3}>
        {bookshelf.wantToRead.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard title={book.title} bookId={book.id} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" style={{ marginTop: '20px' }}>Read</Typography>
      <Grid container spacing={3}>
        {bookshelf.read.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard title={book.title} bookId={book.id} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Bookshelf;
