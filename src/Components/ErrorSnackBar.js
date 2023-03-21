import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function ErrorSnackbar({ open, message, handleClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
}
