import React,{useState,useContext,useEffect} from 'react';
import { Grid, Paper, TextField, Typography,Box } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import Details from './Details.js';
import EmailSmsOtpForm from "./EmailSmsOtpForm.js";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { EmailContext } from './Context/EmailContext.js';
import { PhoneContext } from './Context/PhoneContext.js';
import { NameContext } from './Context/NameContext.js';
import { OTPPageRefreshContext } from './Context/OTPPageRefreshContext.js';
import PaymentForm from './PaymentForm.js';
import RateCard from './RateCard.js';

const styles ={
  root: {
    flexGrow: 1,
    padding: "5%",
  },
  paper: {
    textAlign: 'center',
    border: '1px solid #ddd',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'

  },
};

const Register = ({ children }) => {
  
  
  const [open, setOpenBackdrop] = useState(false);
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const handleDetailsSubmit = (final_values)=>{
    setOpenBackdrop(true);
    console.log(final_values);
    setDetailsSubmitted(final_values);
    
  }

  const handleSuccess = (success)=>{
      console.log(success);
      setOpenBackdrop(false);
  }
  const handleOnProceedClick = (value)=>{
    setProceedWithFormClicked(value);
}


  const {email,updateEmail} = useContext(EmailContext);
  const {phone,updatePhone} = useContext(PhoneContext);
  const {name,updateName} = useContext(NameContext);
  const {otpPageReloadStatus,updateOtpPageReloadStatus} = useContext(OTPPageRefreshContext);
  const [proceedWithFormClicked, setProceedWithFormClicked] = useState(false);
  

  return (
    <div className={styles.root}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <h2 style={{textAlign:"center"}}>"There is more to PCOS and ART... Beyond the obvious”</h2>
          <Paper className={styles.paper} elevation={5} style={{margin:"5%"}}>
          <div style={{padding:"5%",textAlign:"center"}}>
          <PaymentsIcon/>
          { detailsSubmitted ? 
              (proceedWithFormClicked ? <PaymentForm /> : <EmailSmsOtpForm email={detailsSubmitted.email} onProceedClicked={handleOnProceedClick}/>)
                : <Details onSubmit={handleDetailsSubmit} onSuccess={handleSuccess} />
            }
          </div>
          </Paper>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >     
              <CircularProgress color="inherit" />
        
      </Backdrop>
    </div>
  );
};

export default Register;
