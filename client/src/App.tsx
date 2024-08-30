"client"
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Dashboard } from './Components/Dashboard';
import Homepage from './pages/Homepage'
// import CreateAccount from './Components/CreateAccount/CreateAccount';
 import Login from './pages/login';
import { TranslatorProvider } from './contexts/TranslatorContext';
 import {  Route,Routes } from 'react-router-dom';
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
        {/* <Route path="/login" element={<Login />} /> */}
        
          {/* <CreateAccount /> */}
      
        {/* <Dashboard /> */}
          {/* <Route path="/" element={<Navigate to="/search" replace />} /> */}
           <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
        <Homepage />
        
      
      </TranslatorProvider>
    
    </ThemeProvider>
  );
}

export default App;
