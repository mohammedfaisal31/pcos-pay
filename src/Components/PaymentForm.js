import React,{useState,useContext,useEffect} from "react";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import Modal from '@mui/material/Modal';
import { FormControl, FormControlLabel, FormGroup, Checkbox, TextField } from '@mui/material';

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

const validationSchema = Yup.object().shape({
  package_type: Yup.string().required("Required"),
  member_type: Yup.string().required("Required"),
 membership_number: Yup.string().matches(/^[a-zA-Z]{2}-\d{3,4}$/,"Please enter a valid membership number").required("Membership number is required")
  
});

const initialValues = {
  package_type: "",
  member_type: "",
  conference_type:"",
  accomodation_type:"single_room",
  workshop_titles : [],
  membership_number:""

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:  (values) => {
      axios.post('https://kisargo.ml/api/fetch-price', values)
      .then((result)=>{
        setaAmountTitle(result.data.title);
        setTotalAmount(result.data.total_amount);
        setPaymentPurpose(result.data.purpose)
        setGatewayRedirectData({...gatewayData,title:result.data.title,amount:result.data.total_amount,purpose:result.data.purpose,values,workshop_titles:checked})
        setPayNow(true);
      })
      .catch((err)=>console.log(err))
    },
  });
  const createPaymentRequest = ()=>{
    axios.post('https://kisargo.ml/api/createPayment',gatewayRedirectData)
    .then((res)=>{
        console.log(res.data);
        if(res.data.success){
          window.location.href = res.data.payment_request.longurl;
        }
      
    })
    .catch((err)=>console.log(err))
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




  return (
    <>
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
      <TextField
        value={values.membership_number}
        label="Membership Number"
        onChange={(e)=>{
          formik.setFieldValue("membership_number", e.target.value);
        }}
        variant="outlined"
        inputProps={{
          name: "membership_number",
          id: "membership_number",
        }}
      />
      {touched.membership_number && errors.membership_number && (
          <FormHelperText>{errors.membership_number}</FormHelperText>
        )}
    </FormControl>
  }
      {accomodationEnabled? <FormControl
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
        <Typography style={{marginTop:"5%"}}>Note : 2% extra online payments charges may be applicable</Typography>
        </div> :
      <>
            <Button type="submit" variant="contained" color="primary" fullWidth style={{marginTop:"5%",backgroundColor:"#ef6223"}} >
              SUBMIT
            </Button>
            
      </>  
      }
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={box_style}>
        <div style={{alignItems:"center",textAlign:"center"}}>
          <Typography sx={{color:"red"}} align="center">T&C apply</Typography>
          <Button style={{marginTop:"1%",backgroundColor:"#ef6223"}} onClick={handleModalClose} variant="contained">OK</Button>
        </div>
        </Box>
        
        
        
      </Modal>
    </form>
    </>
  );
};

export default PaymentForm;
