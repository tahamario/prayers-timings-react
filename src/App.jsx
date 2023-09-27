import './App.css'
import Prayers from './components/Prayers';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import { Stack } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff', // Set the primary color to black
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff', // Set the label color to black
          borderColor: '#fff'
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e6e4e4'
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#dedede', // Replace with your desired background color
    }, primary: {
      main: '#000', // Set the primary color to black
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#000', // Set the label color to black
        },
      },
    },
  },
});

function App() {

  const [theme, setTheme] = useState(true);
  const [modeText, setModeText] = useState('light')

  const changeMode = () => {
    if (theme) {
      setTheme(false);
      setModeText('dark');
      localStorage.setItem('themeDarkMode',false)
      // sessionStorage.setItem('themeDarkMode', false)
    } else {
      setTheme(true);
      setModeText('light');
      localStorage.setItem('themeDarkMode',true)
      // sessionStorage.setItem('themeDarkMode', true)
    }
  }

  useEffect(() => {
    // const darkTheme = sessionStorage.getItem('themeDarkMode');
    
    const darkTheme =  localStorage.getItem('themeDarkMode');
    console.log(darkTheme)
    if (darkTheme === 'false') {
      setTheme(false);
      setModeText('dark');
    }
  }, [])

  return (
    // this for material ui dark mode <ThemeProvider> and <CssBaseline />
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div>
        <TopBar />
        <Container maxWidth="lg">
          <Stack
            direction='row'
            justifyContent="center"
            marginTop={3}
          >
            <Button variant="outlined" onClick={changeMode} >switch to {modeText} Mode</Button>
          </Stack>
          <Prayers />
        </Container>
      </div>
    </ThemeProvider>

  )
}

export default App
