import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';

// Define the interfaces for the API response
interface ImageLinks {
  thumbnail: string;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  imageLinks: ImageLinks;
}

interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
}

interface BooksResponse {
  items: BookItem[];
}

const fetchBooks = async (query: string): Promise<BookItem[]> => {
  if (!query) {
    return []; // Return an empty array if the query is empty
  }

  try {
    const { data } = await axios.get<BooksResponse>(
      'https://www.googleapis.com/books/v1/volumes',
      {
        params: {
          q: query,
          key: 'AIzaSyCHqIyV86wRIEsNxHFAcpuGikU5Y8D4aLY',
        },
      }
    );
    return data.items || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

// Define the props for the Search component
interface SearchProps {
  searchTerm: string;
}

// Search component for books
const Search: React.FC<SearchProps> = ({ searchTerm }) => {
  const { data: books = [], isLoading, isError, error } = useQuery({
    queryKey: ['books', searchTerm],
    queryFn: () => fetchBooks(searchTerm),
    enabled: !!searchTerm, // Disable query when searchTerm is empty
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (books.length === 0 && searchTerm) {
    return <p>No results found for "{searchTerm}".</p>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h6" sx={{ marginY: 2 }}>
        Books
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={book.volumeInfo.imageLinks?.thumbnail || '/default-book-image.jpg'}
                alt={book.volumeInfo.title}
              />
              <Box sx={{ padding: 2 }}>
                <Typography variant="h6">{book.volumeInfo.title}</Typography>
                <Typography variant="body2">
                  {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Search;
