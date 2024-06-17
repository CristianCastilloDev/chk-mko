import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton, Switch } from '@mui/material';
import { Home, Email, Menu } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [open, setOpen] = useState([false, false, false, false]);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleClick = (index) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Correos Temporales', icon: <Email />, path: '/temp-email' },
  ];

  return (
    <Box
      sx={{
        width: collapsed ? 60 : 240,
        height: '100vh',
        backgroundColor: darkMode ? '#1e1e2d' : '#f5f5f5',
        color: darkMode ? '#fff' : '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        transition: 'width 0.3s',
        zIndex: 1000, // Asegura que la Sidebar esté en la parte superior
        overflow: 'hidden', // Evita desbordamiento del contenido cuando está colapsado
      }}
    >
      <Box>
        <IconButton onClick={handleCollapse} sx={{ mb: 2 }}>
          <Menu />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            textAlign: 'center',
            display: collapsed ? 'none' : 'block',
          }}
        >
          Menu
        </Typography>
        <List>
          {menuItems.map((item, index) => (
            <Link to={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                button
                selected={location.pathname === item.path}
                onClick={() => handleClick(index)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  ':hover': { backgroundColor: darkMode ? '#383845' : '#dcdcdc' },
                  display: 'flex', // Asegura que los items y los iconos se alineen correctamente
                  justifyContent: collapsed ? 'center' : 'flex-start', // Se centra cuando está colapsado
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? '#ff6b6b' : 'inherit',
                    minWidth: collapsed ? 'auto' : '40px',
                    ml: collapsed ? 'auto' : 0, // Centra el icono si está colapsado
                    mr: collapsed ? 'auto' : 0, // Centra el icono si está colapsado
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ display: collapsed ? 'none' : 'block' }}
                />
              </ListItem>
              <Collapse in={open[index] && !collapsed} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 4 }}>
                  {/* Aquí puedes agregar elementos adicionales si los hay */}
                </Box>
              </Collapse>
            </Link>
          ))}
        </List>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" sx={{ mb: 1, display: collapsed ? 'none' : 'block' }}>
          Dark Mode
        </Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          inputProps={{ 'aria-label': 'Toggle Dark Mode' }}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;