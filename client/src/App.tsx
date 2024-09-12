import { createTheme, ThemeProvider } from '@mui/material/styles';
import Homepage from './Components/Homepage';
import BookDetails from './pages/BookDetails';
import BookDashboard from './pages/BookDashboard';
import Search from './Components/Search';
import Login from './pages/login';
import { TranslatorProvider } from './contexts/TranslatorContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  return token ? children : <Navigate to="/login" />;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

function App() {
  const [searchTerm] = useState<string>('');

  return (
    <ThemeProvider theme={theme}>
      <TranslatorProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />

          <Route path="/bookdashboard" element={<ProtectedRoute><BookDashboard /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search searchTerm={searchTerm} /></ProtectedRoute>} />
          <Route path="/book/:bookId" element={<BookDetails />} />

        </Routes>
      </TranslatorProvider>
    </ThemeProvider>
  );
}

export default App;
