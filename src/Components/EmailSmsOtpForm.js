import { useState,useEffect,useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Swal from 'sweetalert';
import { OTPPageRefreshContext } from './Context/OTPPageRefreshContext';
import { EmailContext } from './Context/EmailContext';
import { ProceedWithFormContext } from './Context/ProceedWithFormContext';
import { ModeContext } from './Context/ModeContext';
import SuccessSnackBar from './SuccessSnackBar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const validationSchema = Yup.object().shape({
  emailOtp: Yup.string().required('Required')
});

function EmailSmsOtpForm(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {otpPageReloadStatus,updateOtpPageReloadStatus} = useContext(OTPPageRefreshContext);
  const {contextEmail,updateEmail} = useContext(EmailContext);
  const {setProceedWithFormClicked} = useContext(ProceedWithFormContext);
  const {mode,updateMode} = useContext(ModeContext);
  const [timeLeft, setTimeLeft] = useState(60);
  const[resendButton,setResendButton] = useState(false);
  const [emailResentAlert, setEmailResentAlert] = useState(false);
  const[resendOTPBackdrop,setResendOTPBackdrop]  = useState(false);
  
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '';
    const confirmationMessage = 'Changes you made may not be saved.';
    if (event.defaultPrevented || window.confirm(confirmationMessage)) {
      axios.delete(`https://kisargo.ml/api/remove/entry/${props.email}`)
          .then((result)=>console.log(result.data))
          .catch((err)=>console.log(err))
      window.removeEventListener('beforeunload', handleBeforeUnload);
    } else {
      event.returnValue = confirmationMessage;
    }
  };

  //Resend Effect
  useEffect(() => {
    if (timeLeft === 0) {
      setResendButton(true);
      setTimeLeft(60);
    } else {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleSubmit = (values, { resetForm }) => {
    const data = {otp:values.emailOtp,email:props.email}
    axios.post("https://kisargo.ml/api/otp/verify", data)
    .then((response)=>{
        if(response.data.message === "OK") {
          showAlert();
          axios.delete(`https://kisargo.ml/api/remove/entry/${props.email}`)
          .then((result)=>console.log(result.data,"here1234"))
          .then((err)=>console.log(err))
        }
        else if(response.data.message === "BAD") showFailureAlert();
    })
    .then((err)=>console.log(err))
    resetForm(); 
    setIsSubmitted(true);
  };
  function showAlert() {
    Swal({
      title: 'Success!',
      text: 'OTP VERIFICATION SUCCESSFUL',
      icon: 'success',
      button: 'PROCEED'
    }).then((result)=>{
      if(result){
        console.log("Proceed clicked")
        props.onProceedClicked(true);
      }
    });
    
    
  }
  function showFailureAlert() {
    Swal({
      title: 'Incorrect!',
      text: 'Incorrect OTP.',
      icon: 'error',
      buttons: ['TRY AGAIN','RESEND OTP']
    }).then((result) => {
        if (result) {
          handleResendOTP();
        } else {
          console.log('User clicked Cancel');
        }
      });
    
  }
  const handleResendOTP = () => {
    setResendOTPBackdrop(true);
    axios.delete(`https://kisargo.ml/api/remove/entry/${props.email}`)
          .then((result)=>{
            if(result.data.message === "OK"){
              axios.post('https://kisargo.ml/api/resend-otp',{email:props.email})
              .then((result)=>{
                if(result.data.status === "ok"){
                  setResendOTPBackdrop(false);
                  setEmailResentAlert(true);
                  setResendButton(false);
                  setTimeLeft(timeLeft*2);
                  console.log(timeLeft)
                }
              })
            }
          })
          .catch((err)=>console.log(err))
  };
const handleCloseResendOTPAlert = ()=>{
  setEmailResentAlert(false);
}
return (
  <>
  <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={resendOTPBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  
  <SuccessSnackBar
    open={emailResentAlert}
    message="OTP resent to your email"
    handleClose={handleCloseResendOTPAlert}
  />
  <div className="EmailSmsOtpForm">
      
      <Typography>Please enter the OTP sent to your email </Typography>
      
        <Formik
          initialValues={{
            emailOtp: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors,isValid, touched }) => (
            <Form>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email OTP"
                  name="emailOtp"
                  helperText={touched.emailOtp && errors.emailOtp}
                  
                />
                
                <Button variant="contained" color="primary" type="submit" disabled={!isValid} style={{backgroundColor:"#ef6223"}}>
                  Verify
                </Button>
                <div style={{marginBottom:"5%",marginTop:"5%"}}>
                {resendButton ? <><Button variant="contained" style={{backgroundColor:"#ac2642"}} onClick={handleResendOTP}>RESEND OTP</Button></> : <><Typography>Didn't receive OTP? </Typography><Typography>Please wait to resend({timeLeft}s)</Typography></>}
                </div>
              </Grid>
            </Form>
          )}
        </Formik>
    
    </div>
          
          </>
    );
}


export default EmailSmsOtpForm;