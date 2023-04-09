import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import SuccessfulTransaction from './SuccessfulTransaction';
import axios from 'axios';
import SuccessSnackBar from './SuccessSnackBar';
import PaymentFailed from './PaymentFailed';
export default function PaymentStatus() {
    const { transaction_id } = useParams();
    const[success,setSuccess] = useState(false);
    const[failed,setFailed] = useState(false);
    
    const[emailSent,setEmailSent] = useState(false);
    
    useEffect(()=>{
        const checkPaymentStatus = async ()=>{
            await axios.get(`https://kisargo.ml/api/checkPaymentStatus/${transaction_id}`)
            .then((result)=>{
                console.log(result);
                if(result.data.paymentStatus === 'success'){
                    setSuccess(true);
                    axios.get(`https://kisargo.ml/send-invoice/${transaction_id}`)
                    .then((result)=>{
                        if(result.data === "Email sent successfully") setEmailSent(true);
                        console.log(result.data);
                        
                    })
                    .catch((err)=>console.log(err));
                }
                else if (result.data.paymentStatus === 'failed'){
                    setFailed(true);
                }
                else{
                    setFailed(true);
                }
            })
            .catch((err)=>console.log(err))
        }
        checkPaymentStatus();
    },[]);
   
    const handleInvoiceSentAlertClose = ()=>{
        setEmailSent(false);
    }
   return (
        <div style={{display:"flex", flexDirection: "column", alignItems: "center",justifyContent: "center",textAlign:"center"}}>
            <div>{success && <><SuccessfulTransaction/> </>}</div>
            <div>{failed && <><PaymentFailed/> <a href="/">Click here</a> to try again</>}</div>
            
            <SuccessSnackBar
                open={emailSent}
                message="Payment receipt has been sent to your email"
                handleClose={handleInvoiceSentAlertClose}
  />
        </div>
    
  )
}
