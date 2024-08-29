"client"
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Dashboard } from './Components/Dashboard';
import Homepage from './Components/Homepage'

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
      <Homepage />
        
      {/* <Dashboard /> */}
    </ThemeProvider>
  );
}

export default App;
