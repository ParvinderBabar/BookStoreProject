import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';

interface Book {
  id: string;
  title: string;
  authors: string[];
 imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
}

const fetchBooks = async (query: string): Promise<Book[]> => {
  if (!query) {
    return [];
  }

  try {
    const response = await axios.get(`/api/book/search/${query}`);
    return response.data.books || []; // Assuming 'books' is an array of results from your API
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

interface SearchBooksProps {
  searchTerm: string; // Received from Homepage component
}

const SearchBooks: React.FC<SearchBooksProps> = ({ searchTerm }) => {
  const { data: books = [], isLoading, isError, error } = useQuery({
    queryKey: ['books', searchTerm],
    queryFn: () => fetchBooks(searchTerm),
    enabled: !!searchTerm, // Only run query if there's a search term
  });

  return (
    <Box sx={{ padding: 2 }}>
      {searchTerm && (
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Search Results for "{searchTerm}"
        </Typography>
      )}

      {/* Loading State */}
      {isLoading && <Typography>Loading...</Typography>}

      {/* Error Handling */}
      {isError && <Typography color="error">Error: {(error as Error).message}</Typography>}

      {/* Display Books */}
      {books.length > 0 ? (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={book.imageLinks?.thumbnail || '/bestbooks2024.jpg'}
                  alt={book.title}
                />
                <Box sx={{ padding: 2 }}>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="body2">
                    {book.authors?.join(', ') || 'Unknown Author'}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // If no results are found and the user has typed something
        searchTerm && !isLoading && <Typography>No results found for "{searchTerm}".</Typography>
      )}
    </Box>
  );
};

export default SearchBooks;
