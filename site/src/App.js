import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>

      <Box>
        aa
      </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
