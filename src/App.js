import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';

// MUI imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Apparel Shop</Link>
            </Typography>
            <Button color="inherit">
              <Link to="/admin">Admin</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <main> */}
      {/* <Box sx={{ flexGrow: 1 }}> */}
        {/* <Grid container xspacing={0}> */}
          {/* <Grid item spacing={5}> */}
            <Routes>
              <Route path="/admin" element={<AdminScreen />} exact />
              <Route path="/" element={<HomeScreen />} exact />
            </Routes>
          {/* </Grid> */}
        {/* </Grid> */}
      {/* </Box> */}
      {/* </main> */}
      {/* <footer>
        All rights reserved.
      </footer> */}
    </BrowserRouter>
  );
}

export default App;
