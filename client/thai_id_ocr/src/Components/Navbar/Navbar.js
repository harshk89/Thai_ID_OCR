import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "lightblue"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ color: "black", flexGrow: 1, fontSize: '1.2em' }}>
            THAI ID PORTAL
          </Typography>
          <Button color="inherit" sx={{ color: "black", fontSize: '1.2em', padding: "20px" }}>Home</Button>
          <Button color="inherit" sx={{ color: "black", fontSize: '1.2em', padding: "20px" }}>About</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}