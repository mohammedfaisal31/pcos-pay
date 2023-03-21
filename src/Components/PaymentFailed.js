import React from 'react';
import { CancelOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    fontSize: 100,
    color: '#f44336',
  },
  message: {
    marginTop: "5%",
  },
};

function PaymentFailed() {

  return (
    <div className={styles.root}>
      <CancelOutlined className={styles.icon} />
      <Typography variant="h4" className={styles.message}>
      We regret to inform you that your transaction was not successful
      </Typography>
    </div>
  );
}

export default PaymentFailed;
