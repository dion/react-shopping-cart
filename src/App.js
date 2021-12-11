import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { processLogin, processLogout } from './reducers/userSlice';

import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';

// MUI imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Logo from './assets/logo.png';

const App = (props) => {
  const dispatch = useDispatch();
  const loggedInStatus = useSelector((state) => state.user.loggedInStatus);

  const ElevationScroll = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  };

  const handleLogout = () => {
    dispatch(
      processLogout()
    );
  };

  return (
    <BrowserRouter>
      <ElevationScroll {...props}>
        <AppBar xposition="static" sx={{ backgroundColor: '#3b474e', padding: '.7rem' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" sx={{ cursor: 'pointer' }}>
                <img src={Logo} alt="Apparel Shop" />
              </Link>
            </Typography>
            <Button color="inherit">
              {loggedInStatus && (
                <Link to="/account" onClick={handleLogout}>Sign Out</Link>
              )}
              {!loggedInStatus && (
                <Link to="/account">Sign In</Link>
              )}
              
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Grid container sx={{ padding: '0 15px', mt: '87px' }}>
        <Routes>
          <Route path="/account" element={<AdminScreen />} exact />
          <Route path="/" element={<HomeScreen />} exact />
        </Routes>
      </Grid>
      {/* <footer>
        All rights reserved.
      </footer> */}
    </BrowserRouter>
  );
}

export default App;
