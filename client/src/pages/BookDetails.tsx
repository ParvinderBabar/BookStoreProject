import React from 'react';
import { useParams } from 'react-router-dom';
import BookCard from './BookCard';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Example hardcoded book details
  const bookDetails: { [key: string]: { title: string; author: string } } = {
    1: { title: "The Pragmatic Programmer", author: "Andrew Hunt and David Thomas" },
    2: { title: "Clean Code", author: "Robert C. Martin" },
    3: { title: "Atomic Habits", author: "James Clear" },
    4: { title: "The Art of Computer Programming", author: "Donald Knuth" },
  };

  // Ensure id is defined before using it
  if (!id || !bookDetails[id]) {
    return <p>Book not found</p>;
  }

  const book = bookDetails[id];

  return (
    <BookCard title={book.title}  bookId={id} />
  );
};

export default BookDetails;
