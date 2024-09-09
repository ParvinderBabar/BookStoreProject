import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  title: string;
  author: string;
  bookId: string; // Unique identifier for routing
}

const BookCard: React.FC<BookCardProps> = ({ title, author, bookId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${bookId}`); // Navigate to a book details page
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            by {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
