"client"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookShelf from './pages/BookShelf';
import Homepage from './Components/Homepage';
import BookDetails from './pages/BookDetails';
// import CreateAccount from './Components/CreateAccount/CreateAccount';
 import Login from './pages/login';
import { TranslatorProvider } from './contexts/TranslatorContext';
import { Route, Routes } from 'react-router-dom';
import { Navigate, } from "react-router-dom";
//  import SignIn from './pages/SignIn';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token"); // Get the token from local storage
  return token ? children : <Navigate to="/" />;
};
const theme = createTheme({
  palette: {
    primary: {
      main: '#F89B3E',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TranslatorProvider>
        <Routes>
       
        
         
          {/* <Route path="/" element={<Navigate to="/search" replace />} /> */}
           <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/book/:id" element={<BookDetails />} />
         
    {/* <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} /> */}
    <Route path="/book/:id" element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
    <Route path="/Bookshelf" element={<ProtectedRoute><BookShelf /></ProtectedRoute>} />
      </Routes>
        
      
      </TranslatorProvider>
    
    </ThemeProvider>
  );
}

export default App;
