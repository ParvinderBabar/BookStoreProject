import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Typography as MUI_Typography } from '@mui/material';

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

// Fetch books from Google Books API
const fetchBooks = async (): Promise<BookItem[]> => {
  const { data } = await axios.get<BooksResponse>(
    'https://www.googleapis.com/books/v1/volumes?q=java&key=AIzaSyCHqIyV86wRIEsNxHFAcpuGikU5Y8D4aLY'
  );
  return data.items;
};

// Define the props for the Search component
interface SearchProps {
  searchTerm: string;
}

// Search component for books
const Search: React.FC<SearchProps> = ({ searchTerm }) => {
  const { data: books = [], isLoading, isError, error } = useQuery<BookItem[], Error>({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const filteredBooks = books.filter((book) =>
    book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h6" sx={{ marginY: 2 }}>
        Book Search Results
      </Typography>
      <Grid container spacing={2}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
              <CardContent>
                <MUI_Typography variant="h6" component="div">
                  {book.volumeInfo.title}
                </MUI_Typography>
                <MUI_Typography variant="body2" color="text.secondary">
                  {book.volumeInfo.authors.join(', ')}
                </MUI_Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Search;
