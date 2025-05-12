import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import Footer from './components/Footer'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Navbar1 from './components/Navbar1';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif",
  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Navbar1 />
    
    </>
  )
}

export default App
