import React, { useState } from 'react';
import Orders from '../components/Orders';
import TextField from '@mui/material/TextField';
import { Button, Grid, Typography } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Adminscreen = () => {
   let [loggedInStatus, setLoggedInStatus] = useState(false);
   let [userName, setUserName] = useState('');
   let [password, setPassword] = useState('');
   let [errorMessages, setErrorMessages] = useState([]);
   
   // TODO: add alert stuff
   const doLogin = () => {
      if (userName == 'demo' && password == 'test') {
         setLoggedInStatus(true);
      } else {
         setErrorMessages(['Login is incorrect, check your credentials and try again.']);
         console.log('errorMessages', errorMessages);
      }
   };

   return (
      <div style={{ width: '100%' }}>
         
         {!loggedInStatus && (
            <Grid 
               container 
               direction="column"
               justifyContent="center"
               alignItems="center"
               sx={{ 
                  padding: '1rem', 
                  margin: '2rem 1rem' 
               }}
            >
               {errorMessages.length > 0 && (
                  <Stack sx={{ width: '100%', mb: '1rem' }} spacing={2}>
                     <Alert severity="error">{errorMessages[0]}</Alert>
                  </Stack>
               )}

               <Typography variant='h5'>
                  <strong>My Account</strong>
               </Typography>
               
               <TextField 
                  id="username" 
                  label="Username" 
                  variant="outlined" 
                  sx={{
                     my: '1rem'
                  }}
                  onChange={(e) => setUserName(e.target.value)}
               />
               
               <TextField 
                  id="password" 
                  label="Password" 
                  type="password"
                  variant="outlined" 
                  sx={{
                     my: '1rem'
                  }} 
                  onChange={(e) => setPassword(e.target.value)}
               />
               
               <Button 
                  variant="outlined" 
                  sx={{ my: '1rem' }}
                  onClick={doLogin}
                  endIcon={<TrendingFlatIcon />}
               >
                  Login 
               </Button>
            </Grid>
         )}

         {loggedInStatus && (
            <Orders />
         )}
      </div>
   );
};

export default Adminscreen;
