import React from 'react';
import {
  Paper,
  Button,
  Typography,
} from '@mui/material';

const Header = ({ openModal }) => (
  <Paper sx={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, p: 2, bgcolor: 'primary.main',
  }}
  >
    <Typography variant="h6" sx={{ mb: 1, textDecoration: 'underline' }}>Administratoriaus veiksmai</Typography>
    <Button variant="outlined" color="warning" size="small" onClick={openModal}>Pridėti naują produktą</Button>
  </Paper>
);

export default Header;
