import React from 'react';
import { CheckCircleOutline } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:"center",
    height:"100vh"
  },
  icon: {
    fontSize: 100,
    color: '#4caf50',
  },
  message: {
    marginTop: "5%",
  },
};

function SuccessfulTransaction() {
  
  return (
    <div className={styles.root}>
      <CheckCircleOutline className={styles.icon} />
      <Typography variant="h4" className={styles.message}>
      You're good to go! Payment complete
      </Typography>
      <a href="/">Click here</a> to buy another package
    </div>
  );
}

export default SuccessfulTransaction;
