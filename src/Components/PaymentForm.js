import React,{useState,useContext,useEffect} from "react";
import { Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import Modal from '@mui/material/Modal';
import { FormControl, FormControlLabel, FormGroup, Checkbox, TextField, DialogTitle, DialogContent, MenuItem, Backdrop, CircularProgress, TableContainer } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Swal from 'sweetalert';
import { Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

import {
  InputLabel,
  Select,
  Button,
  FormHelperText,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { GatewayDataContext } from "./Context/GatewayDataContext";
import AgreementWrapper from "./AgreementWrapper";

const validationSchema = Yup.object().shape({
  package_type: Yup.string().required("Required"),
  member_type: Yup.string().required("Required"),
  membership_number: Yup.string().when("member_type", {
    is: "member"  ,
    then: ()=>  Yup.string().matches(/^(LM|PM|AM|ASPIRE|ISAR)-(\d{1,4}|\d{6})$/i,"Please enter a valid membership number").required("Membership number is required") ,
    otherwise: ()=> Yup.string().notRequired(),
  }),
    

});
// if(member_type === "member")  schema.matches(/^[a-zA-Z]{2}-\d{3,4}$/,"Please enter a valid membership number").required("Membership number is required") 
const initialValues = {
  package_type: "",
  member_type: "",
  conference_type:"",
  accomodation_type:"single_room",
  workshop_titles : [],
  membership_number:"",
  check_in_date:"",
  check_out_date:""

};

function formatRupee(amount) {
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  });
}

const box_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerHeight-20,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const clickhereButton = {
  background: "none",
  border: "none",
  color: "blue",
  textDecoration: "underline",
  cursor: "pointer",
  marginTop:"2%"
}
const PaymentForm = () => {
  
  const [openModal, setOpenModal] = useState(false);
  
  const [amountTitle, setaAmountTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentPurpose, setPaymentPurpose] = useState("");
  
  const [payNow, setPayNow] = useState(false);
  const [accomodationEnabled, setAccomodationEnabled] = useState(false);
  
  const {gatewayData, updateGatewayData} = useContext(GatewayDataContext);
  const[gatewayRedirectData, setGatewayRedirectData] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const [showOfflinePaymentModal, setOfflinePaymentModal] = useState(false);
  const [offlinePaymentMethod, setOfflinePaymentMethod] = useState("");
  const [openOfflineBackdrop, setOpenOfflineBackdrop] = useState(false);


  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  
  const [showDatePickers, setShowDatePickers] = useState(false);
  const [daysToAddtoMax,setDaysToAddtoMax] = useState(0);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:  (values) => {
      console.log(values);
      axios.post('https://kisargo.ml/api/fetch-price', values)
      .then((result)=>{
        setaAmountTitle(result.data.title);
        setTotalAmount(result.data.total_amount);
        setPaymentPurpose(result.data.purpose)
        setGatewayRedirectData({...gatewayData,title:result.data.title,amount:result.data.total_amount,purpose:result.data.purpose,values,workshop_titles:checked,check_in_date:checkInDate,check_out_date:checkOutDate})
        setPayNow(true);
      })
      .catch((err)=>console.log(err))
    },
  });
  const createPaymentRequest = ()=>{
    console.log(gatewayRedirectData)
    showPaymentPrompt()
    .then((result)=>{
        if(result === "online"){
          axios.post('https://kisargo.ml/api/createPayment',gatewayRedirectData)
          .then((res)=>{
              console.log(res.data);
              if(res.data.success){
                window.location.href = res.data.payment_request.longurl;
              }
            
          })
          .catch((err)=>console.log(err))
        }
        else{
          setOfflinePaymentModal(true);
          setOpenOfflineBackdrop(true)
          axios.post('https://kisargo.ml/api/createOfflinePayment',gatewayRedirectData)
          .then((res)=>{
              console.log(res.data);
              if(res.data.success){
                setOpenOfflineBackdrop(false);
              }
            
          })
        }
    });
    
  }
  const { values, handleChange, handleSubmit, errors, touched } = formik;

  const handleOpenModal = ()=>{
    setOpenModal(true);
  }

  const handleModalClose = ()=>{
    setOpenModal(false);
  }

  const [checked, setChecked] = useState([]);
  const [showChecks, setShowChecks] = useState(false);
  const [showMemNum, setShowMemNum] = useState(false);

  const [showCheque, setShowCheque] = useState(false);

  const handleCheckChange = (event) => {
    if (event.target.checked) {
      // add checkbox to checked array if user checks it
      setChecked([...checked, event.target.name]);
    } else {
      // remove checkbox from checked array if user unchecks it
      setChecked(checked.filter((name) => name !== event.target.name));
    }
  };

  const canCheckMore = checked.length < 2;

  const handleResetWorkshops = ()=>{
    setChecked([]);
  }
  const handleCloseOfflinePaymentModal =()=>{
    setOfflinePaymentModal(false);
    showOfflinepaymentComplete("Thank you",`Dear ${gatewayRedirectData.name}, if you have successfully submitted your payment, we kindly request that you await confirmation from our administrator. Once the verification process is complete, they will be in touch with you promptly. Thank you for your patience and understanding`)
    .then((result)=>{
        if(result === "ok"){
          window.location.href = "https://pcos-pay.vercel.app/"
        }
    })
  }

  const handleShowAlert = () => {
    setShowAlert(true);
  };
  const handleOfflinePaymentMethodChange = (e)=>{
      setOfflinePaymentMethod(e.target.value)
      if (e.target.value === "cheque") {
        setShowCheque(true);
      }
      else {
        setShowCheque(false);
      }
  }
  
  function showPaymentPrompt() {
    return Swal({
      title: 'Payment Options',
      text: 'How would you like to pay?',
      buttons: {
              offline:{
                text:"NTGS/NEFT/Cheque",
                value:"offline"
              },
              online:{
                text:"ONLINE",
                value:"online"
              }
              
      }
      
      
    })
    
  }
  function showOfflinepaymentComplete(title,text) {
    return Swal({
      title: title,
      icon: "success",
      text: text,
      buttons: {
              ok:{
                text:"OK",
                value:"ok"
              },
      }
    })
    
  }

  const handleConferenceSelection = (e) => {
    if (e.target.value === "conference_type_1") {
      setShowChecks(true);
    } else {
      setShowChecks(false);
    }
  };

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    setCheckOutDate(date ? new Date(date.setDate(date.getDate() + 3)) : null);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
    const minCheckOutDate = dayjs(e.target.value).add(daysToAddtoMax, "day").format("YYYY-MM-DD");
    setCheckOutDate(minCheckOutDate);
  };

  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openOfflineBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <Typography>Please determine your coverage</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              margin="normal"
              error={touched.package_type && Boolean(errors.package_type)}
              InputLabelProps={{ shrink: true }}
          >
        <InputLabel htmlFor="package_type" >Package Type</InputLabel>
        <Select
          native
          value={values.package_type}
          label="Package type"
          onChange={(e)=>{
            formik.resetForm();
            setShowChecks(false);
            handleResetWorkshops();
            if(e.target.value === "residential") {
              setAccomodationEnabled(true);
            }
            else {
              setAccomodationEnabled(false);
            }
            setPayNow(false);
            formik.setFieldValue("package_type", e.target.value);
          }}
          inputProps={{
            name: "package_type",
            id: "package_type",
          }}
        >
          <option value="" />
          <option value="non_residential">Non Residential</option>
          <option value="residential">Residential</option>
        </Select>
        {touched.package_type && errors.package_type && (
          <FormHelperText>{errors.package_type}</FormHelperText>
        )}
      </FormControl>
      
      {accomodationEnabled && 
      <FormControl
        fullWidth
        margin="normal"
        error={touched.accomodation_type && Boolean(errors.accomodation_type)}
      >
        <InputLabel htmlFor="accomodation_type">Accomodation Type</InputLabel>
        <Select
          native
          value={values.accomodation_type}
          label="Accomodation Type"
          onChange={(e)=>{
            setShowChecks(false);
            setPayNow(false);
            formik.setFieldValue("accomodation_type", e.target.value);
          }}
          inputProps={{
            name: "accomodation_type",
            id: "accomodation_type",
          }}
        >
          <option value="single_room">Single Room</option>
          <option value="twin_room">Twin Sharing per person</option>
        </Select>
        {accomodationEnabled && touched.accomodation_type && errors.accomodation_type && (
          <FormHelperText>{errors.accomodation_type}</FormHelperText>
        )}
      </FormControl>}

      <FormControl
        fullWidth
        margin="normal"
        error={touched.member_type && Boolean(errors.member_type)}
      >
        <InputLabel htmlFor="member_type">Membership Type</InputLabel>
        <Select
          native
          value={values.member_type}
          label="Membership Type"
          onChange={(e)=>{
            if(e.target.value === "member") setShowMemNum(true);
            else setShowMemNum(false);
            setPayNow(false);
            formik.setFieldValue("member_type", e.target.value);
          }}
          inputProps={{
            name: "member_type",
            id: "member_type",
          }}
        >
          <option value="" />
          <option value="member">PCOS/ISAR/ASPIRE Members</option>
          <option value="non_member">Non member</option>
        </Select>
        {touched.member_type && errors.member_type && (
          <FormHelperText>{errors.member_type}</FormHelperText>
        )}
      </FormControl>

      {showMemNum &&
      <FormControl
              fullWidth
              margin="normal"
              error={touched.membership_number && Boolean(errors.membership_number)}
            
          >
      <>
      <TextField
        value={values.membership_number}
        label="Membership Number"
        onChange={(e)=>{
          formik.setFieldValue("membership_number", e.target.value);
        }}
        defaultValue="ab-000"
        variant="outlined"
        inputProps={{
          name: "membership_number",
          id: "membership_number",
        }}
      />
      
      <Typography>Example : </Typography>
      <Typography><i>for</i> <span style={{fontWeight:"bold"}}>PCOS SOCIETY</span> <i>enter &gt;</i> <span style={{color:"rgb(239, 98, 35)",fontWeight:"bold"}}>LM-1234</span></Typography>
      <Typography><i>for</i> <span style={{fontWeight:"bold"}}>ASPIRE</span> <i>enter &gt;</i> <span style={{color:"rgb(239, 98, 35)",fontWeight:"bold"}}>ASPIRE-0001</span></Typography>
      <Typography><i>for</i> <span style={{fontWeight:"bold"}}>ISAR</span> <i>enter &gt;</i> <span style={{color:"rgb(239, 98, 35)",fontWeight:"bold"}}>ISAR-000001</span></Typography>
      </>
      
      {touched.membership_number && errors.membership_number && (
          <FormHelperText>{errors.membership_number}</FormHelperText>
        )}
    </FormControl>
  }
      {accomodationEnabled? 
      <FormControl
        fullWidth
        margin="normal"
        error={touched.member_type && Boolean(errors.member_type)}
      >
        <InputLabel htmlFor="conference_type">Conference Selection</InputLabel>
        <Select
          native
          value={values.conference_type}
          label="Conference Selection"
          onChange={(e)=>{
            if(e.target.value === "conference_type_1") setShowChecks(true)
            else setShowChecks(false);
            setPayNow(false);
            setShowDatePickers(true);
            if(e.target.value === "conference_type_1" || e.target.value === "conference_type_2") setDaysToAddtoMax(2)
            else setDaysToAddtoMax(1);
            formik.setFieldValue("conference_type", e.target.value);
            
          }}
          inputProps={{
            name: "conference_type",
            id: "conference_type",
          }}
        >
          <option value=""></option>
          <option value="conference_type_1">2 nights and 3 days - Conference + 2 Workshops</option>
          <option value="conference_type_2">2 nights and 3 days - Conference only</option>
          <option value="conference_type_3">1 nights and 2 days - Conference only</option>
          
        </Select>
        {touched.conference_type && errors.conference_type && (
          <FormHelperText>{errors.conference_type}</FormHelperText>
        )}
      </FormControl>
      :
      <FormControl
        fullWidth
        margin="normal"
        error={touched.member_type && Boolean(errors.member_type)}
      >
        <InputLabel htmlFor="conference_type">Conference Selection</InputLabel>
        <Select
          native
          value={values.conference_type}
          label = "Conference Selection"
          onChange={(e)=>{
            if(e.target.value === "conference_type_2" || e.target.value === "conference_type_3") setShowChecks(true)
            else setShowChecks(false);
            setPayNow(false);
            formik.setFieldValue("conference_type", e.target.value);
          }}
          inputProps={{
            name: "conference_type",
            id: "conference_type",
          }}
        >
          <option value=""></option>
          <option value="conference_type_1">Conference only</option>
          <option value="conference_type_2">Conference + 2 Workshops</option>
          <option value="conference_type_3">Post Graduate Students Conference + 2 Workshops</option>
          
        </Select>
        {touched.conference_type && errors.conference_type && (
          <FormHelperText>{errors.conference_type}</FormHelperText>
        )}
      </FormControl>
      }
      {showDatePickers && 
      <>
      <FormControl fullWidth margin="normal">
            <TextField
              id="checkin_date"
              name="checkin_date"
              label="Check-in Date"
              type="date"
              value={checkInDate}
              InputLabelProps={{
                shrink: true,
              }} 
              inputProps={{
                min: "2023-06-09",
                max: "2023-06-11",
              }}
              onChange={handleCheckInDateChange}
            />
          </FormControl>
        
          {checkInDate && (
            <FormControl fullWidth margin="normal">
              <TextField
                id="checkout_date"
                name="checkout_date"
                label="Check-out Date"
                type="date"
                value={checkOutDate}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: dayjs(checkInDate).add(daysToAddtoMax, "day").format("YYYY-MM-DD"),
                  max: dayjs(checkInDate).add(daysToAddtoMax, "day").format("YYYY-MM-DD"),
                }}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </FormControl>
          )}
          <Typography>Date Format: MM/DD/YYYY</Typography>
          </>
        }
      {showChecks && 
      <>
      <Typography sx={{marginTop:"5%",color:"#ef6223",fontWeight:"bold"}}>Workshp Titles(Attend any 2)</Typography>
      <FormControl component="fieldset" sx={{marginTop:"2%"}}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check1')} onChange={handleCheckChange} name="check1" disabled={!canCheckMore} required/>}
          label="Insulin Resistance in PCOS"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check2')} onChange={handleCheckChange} name="check2" disabled={!canCheckMore} required/>}
          label="Embryo Biopsy and PGT"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check3')} onChange={handleCheckChange} name="check3" disabled={!canCheckMore} required/>}
          label="Body Image and PCOS"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check4')} onChange={handleCheckChange} name="check4" disabled={!canCheckMore} required/>}
          label="Ultrasound in PCOS"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check5')} onChange={handleCheckChange} name="check5" disabled={!canCheckMore} required/>}
          label="Vitrification of Oocytes and Embryos"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check6')} onChange={handleCheckChange} name="check6" disabled={!canCheckMore} required/>}
          label="Errors in ART"
        />
      </FormGroup>
    </FormControl>
    <Typography><button style={clickhereButton} onClick={handleResetWorkshops}>Click here</button>to reset Workshops preferences</Typography>
    </>
    }
      
      {
        payNow ? 
        <div style={{marginTop:"8%"}}><Typography >Package value : {amountTitle}</Typography>
        <Typography style={{color:"#b00020"}}>To pay : {formatRupee(totalAmount)}</Typography>
        
        <Button  variant="contained" color="primary" fullWidth style={{marginTop:"5%",backgroundColor:"#ac2642"}}  onClick={createPaymentRequest}>
          PAY NOW
        </Button>
        <Typography style={{marginTop:"5%"}}>Note : 3.64% online payments charges are applicable</Typography>
        </div> :
      <>
            <Button type="submit" variant="contained" color="primary" fullWidth style={{marginTop:"5%",backgroundColor:"#ef6223"}} >
              SUBMIT
            </Button>
            
      </>  
      }
      <Typography><button style={clickhereButton} onClick={handleOpenModal}>Click here</button>to view the rate card</Typography>
      
    </form>
    <Dialog
        open={openModal}
        onClose={handleModalClose}
        PaperProps={{
          style: {
            width: '80%',
            maxWidth: 'none',
          },
        }}
       
      >
        <DialogTitle>Pricing</DialogTitle>
        <DialogContent >
        <div >
           
           <AgreementWrapper/>
          <Button style={{marginTop:"1%",backgroundColor:"#ef6223"}} onClick={handleModalClose} variant="contained">OK</Button>
        </div>
        </DialogContent>
        
        
      </Dialog>
      
      <Dialog
        open={showOfflinePaymentModal}
        onClose={handleCloseOfflinePaymentModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
           <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:"#ac2642"}}>
            BANK TRANSFER
          </Typography>
        </DialogTitle>
       <DialogContent>
         
          {/* <FormControl sx={{width:"20%",marginTop:"3%",marginBottom:"3%"}} >
            <InputLabel>Payment Type</InputLabel>
            <Select label="Payment Type" onChange={handleOfflinePaymentMethodChange} value={offlinePaymentMethod}>
              <MenuItem value="neft">NEFT/RTGS</MenuItem>
              <MenuItem value="cheque">Cheque/DD</MenuItem>
            </Select>
          </FormControl>

          {
            showCheque ? 
              <>
              <Typography><Typography sx={{color:"#ac2642"}} >DD/Cheque</Typography> in favour of "<b>THE PCOS SOCIETY </b>"</Typography>
              <Typography sx={{color:"#ac2642"}} >Cheque to be mailed to</Typography> 
              <Typography>xyz</Typography>
              </>
              :
              <>
              <Typography><Typography sx={{color:"#ac2642"}} >Account No</Typography> <b>1234567890 </b></Typography>
              <Typography>xyz</Typography>
              </>
              


          
          } */}

<TableContainer >
<Table sx={{marginTop:"2%"}}>
      <TableHead sx={{backgroundColor:"#ac2642"}}>
        <TableRow>
          <TableCell sx={{ border: '1px solid black',color:"#fff",fontWeight:"bold" }}>NEFT/RTGS</TableCell>
          <TableCell sx={{ border: '1px solid black',color:"#fff",fontWeight:"bold" }}>Cheque/DD Payment</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell sx={{ border: '1px solid black',fontWeight:"bold" }}>Account No : 840510210000006</TableCell>
          <TableCell sx={{ border: '1px solid black',fontWeight:"bold" }}>DD/cheque in favor of "THE PCOS SOCIETY"</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ border: '1px solid black',fontWeight:"bold" }}>Bank name and adress : Bank of India , 623 10TH A MAIN NE, MAIN BUS STOP 4TH B, BANGALORE, KARNATAKA , 560011 <br/> RTGS/IFSC code: BKID0008405 </TableCell>
          <TableCell sx={{ border: '1px solid black',fontWeight:"bold" }}><Typography sx={{color:"red"}}>Cheque to be mailed To:</Typography> Dr.Patil's Fertility and Endoscopy,No 1 Uma Admirality,First floor, Above HDFC Bank,Near Jal Bhavan,Bannerghatta Road,Bengaluru 560029</TableCell>
        </TableRow>
        </TableBody>
    </Table>
    </TableContainer>
          <Typography sx={{marginTop:"2%"}}>Note: Scanned copy of Bank Transfer should be sent to <Typography sx={{color:"blue"}}>pcosart2023@gmail.com</Typography> </Typography>
          <Typography sx={{marginTop:"2%"}}> Please capture a screenshot of the above details for your reference </Typography>
          <Button style={{marginTop:"1%",backgroundColor:"#ef6223"}} onClick={handleCloseOfflinePaymentModal} variant="contained">OK</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentForm;
