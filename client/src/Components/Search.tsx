import React from 'react';
import { useQuery } from 'react-query'; // Ensure 'react-query' is installed
import axios from 'axios';

// Define the type for book items
interface BookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
    };
  };
}

// Adjust the type to match the API response
const fetchBooks = async (searchTerm: string): Promise<{ items: BookItem[] }> => {
  const { data } = await axios.get(`https://api.example.com/books?q=${searchTerm}`);
  return data;
};

interface SearchProps {
  searchTerm: string;
  onSearchResults: (books: BookItem[]) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearchResults }) => {
  const { data, error, isLoading } = useQuery<{ items: BookItem[] }>(
    ['searchBooks', searchTerm],
    () => fetchBooks(searchTerm),
    {
      onSuccess: (data) => {
        onSearchResults(data.items); // Pass data to parent component
      },
      enabled: !!searchTerm, // Only run the query if searchTerm is not empty
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

  return (
    <div>
      {/* Display or process the data if needed */}
      {data && (
        <ul>
          {data.items.map((book) => (
            <li key={book.id}>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
              <div>{book.volumeInfo.title}</div>
              <div>{book.volumeInfo.authors.join(', ')}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
