import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import TempEmail from './pages/TempEmail';
import { Box } from '@mui/material';
import './index.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', background: darkMode ? '#121212' : '#fff' }}>
          <Sidebar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginLeft: sidebarCollapsed ? '40px' : '10px',
              padding: 2,
              transition: 'margin-left 0.3s',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/temp-email" element={<TempEmail />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;