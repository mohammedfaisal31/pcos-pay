import { Backdrop, Box, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, Modal, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import SuccessSnackBar from './SuccessSnackBar';
import dayjs from "dayjs";

  
const clickhereButton = {
    background: "none",
    border: "none",
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop:"2%"
  }
  const validationSchema = Yup.object().shape({
    package_type: Yup.string().required("Required"),
    member_type: Yup.string().required("Required"),
    membership_number: Yup.string().when("member_type", {
      is: "member"  ,
      then: ()=>  Yup.string().matches(/^(LM|PM|AM|ASPIRE|ISAR)-(\d{1,4}|\d{6})$/i,"Please enter a valid membership number").required("Membership number is required") ,
      otherwise: ()=> Yup.string().notRequired(),
    }),
    user_email: Yup.string().email("Enter a valid email").required("Required"),
    user_phone: Yup.string().required("Required"),
    user_salutation: Yup.string().required("Required"),
    user_name: Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
    paymentID: Yup.string().required("Required"),
    payment_purpose: Yup.string().required("Required"),
    user_age: Yup.string().required("Required"),
    user_address: Yup.string().required("Required"),
    user_city: Yup.string().required("Required"),
    user_state: Yup.string().required("Required"),
    user_pincode: Yup.string().required("Required"),
    user_designation: Yup.string().required("Required"),
    user_diet: Yup.string().required("Required"),
    user_institution: Yup.string().required("Required"),
    user_medical_council_number: Yup.string().required("Required"),
    user_sex: Yup.string().required("Required"),
    payment_method: Yup.string().required("Required"),
    
  });
    
export default function AddEntryModal(props) {
    
    const handleCloseAddEntryModal = ()=>{
      props.closeModal(false)
    }
    const handlepaymentStatusChange = (e)=>{
        setPaymentStatus(e.target.value)
    }

     const initialValues = {
       accomodation_type: "",
       amount:  "",
       conference_type:  "",
       date_of_transaction:   "",
       member_type:  "",
       package_type: "",
       paymentID: "",
       paymentStatus:  "",
       payment_purpose: "",
       time_of_transaction: "",
       transaction_id: "",
       user_address:"",
       user_age: "",
       user_city:  "",
       user_designation:"",
       user_diet: "",
       user_email: "",
       user_institution: "",
       user_medical_council_number:  "",
       user_membership_number: "",
       user_name: "",
       user_phone:"",
       user_pincode: "",
       user_salutation: "",
       user_sex:"",
       user_state: "",
       workshop_titles: "",
       membership_number:"",
       workshop_titles : []
       };
      const[paymentStatus,setPaymentStatus] = useState("")
      const paymentStatusOptions = ["success", "failed", "pending"];
      const [showEditBackdrop ,setShowEditBackdrop] = useState(false);
      const [showSuccessBar ,setShowSuccessBar] = useState(false);
      const [accomodationEnabled, setAccomodationEnabled] = useState(false);
      const [showMemNum, setShowMemNum] = useState(false);
      const [checked, setChecked] = useState([]);
      const [showChecks, setShowChecks] = useState(false);
      const [checkInDate, setCheckInDate] = useState(null);
      const [checkOutDate, setCheckOutDate] = useState(null);
      
      const [showDatePickers, setShowDatePickers] = useState(false);
      const [daysToAddtoMax,setDaysToAddtoMax] = useState(0);
      
      const canCheckMore = checked.length < 2;
      const handleCheckChange = (event) => {
        if (event.target.checked) {
          // add checkbox to checked array if user checks it
          setChecked([...checked, event.target.name]);
        } else {
          // remove checkbox from checked array if user unchecks it
          setChecked(checked.filter((name) => name !== event.target.name));
        }
      };

      const handleResetWorkshops = ()=>{
        setChecked([]);
      }
  
      const handleCloseSuccessBar = ()=>{
        setShowSuccessBar(false);
      }
      const handleSubmit = (values) => {
          values.workshop_titles = checked;
          values.check_in_date = checkInDate;
          values.check_out_date = checkOutDate;
          console.log(values);
          setShowEditBackdrop(true);
          axios.post("https://kisargo.ml/api/entry",values)
          .then((result)=>{
            console.log(result.data)
            setShowEditBackdrop(false);
            setShowSuccessBar(true);
          })
          .catch((err)=>console.log(err))
          
      };

      const handleCheckInDateChange = (e) => {
        setCheckInDate(e.target.value);
        const minCheckOutDate = dayjs(e.target.value).add(daysToAddtoMax, "day").format("YYYY-MM-DD");
        setCheckOutDate(minCheckOutDate);
      };

    return (
    <Dialog
          open={props.openModal}
          onClose={handleCloseAddEntryModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{minWidth:"650px"}}
        > 
      <DialogTitle> 
          <Grid container>
            <Grid item xs={9}>
              <Typography>Add an Entry</Typography>
            </Grid>
            <Grid item xs={3}>
            <Button variant="contained" onClick={handleCloseAddEntryModal} sx={{color:"#000"}} startIcon={<CancelIcon />}>
                Cancel
             </Button>
            </Grid>
          </Grid>
      </DialogTitle>
            <DialogContent sx={{minWidth:"500px"}}>
            <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
    {({ values, errors, touched ,resetForm,setFieldValue}) => (
      <Form>
         <Stack spacing={2} sx={{marginTop:"5%"}}>
         
          
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
            resetForm();
            setShowChecks(false);
            handleResetWorkshops();
            if(e.target.value === "residential") {
              setAccomodationEnabled(true);
            }
            else {
              setAccomodationEnabled(false);
            }
            setFieldValue("package_type", e.target.value);
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
            setFieldValue("accomodation_type", e.target.value);
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
            setFieldValue("member_type", e.target.value);
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
          setFieldValue("membership_number", e.target.value);
        }}
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
            setShowDatePickers(true);
            if(e.target.value === "conference_type_1" || e.target.value === "conference_type_2") setDaysToAddtoMax(2)
            else setDaysToAddtoMax(1);
            
            setFieldValue("conference_type", e.target.value);
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
            setFieldValue("conference_type", e.target.value);
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


          {/* <Field name="member_type" as={TextField} label="Membership type"  />
          <Field name="accomodation_type" as={TextField} label="Accomodation Type"  />
          <Field name="conference_type" as={TextField} label="Type of conference"  />  */}
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
          <FormControl>
            <InputLabel>Payment Status</InputLabel>
           <Field
                id="paymentStatus"
                name="paymentStatus"
                label="Payment Status"
                fullWidth
                variant="outlined"
                as={Select}
                defaultvalue={values.paymentStatus}
            >
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                
        
            </Field>
         </FormControl>
         <Field name="user_phone" as={TextField} label="Phone"  error={touched.user_phone && Boolean(errors.user_phone)} helperText={touched.user_phone && errors.user_phone}/>
          <Field name="user_email" as={TextField} label="Email"  error={touched.user_email && Boolean(errors.user_email)} helperText={touched.user_email && errors.user_email}/>
          <Field name="user_salutation" as={TextField} label="Salutation"   error={touched.user_salutation && Boolean(errors.user_salutation)} helperText={touched.user_salutation && errors.user_email}/>
          <Field name="user_name" as={TextField} label="Name"   error={touched.user_name && Boolean(errors.user_name)} helperText={touched.user_name && errors.user_name}/>
          <Field name="amount" as={TextField} label="Amount paid(includng GST)"  error={touched.amount && Boolean(errors.amount)} helperText={touched.amount && errors.amount}/>
          <Field name="paymentID" as={TextField} label="Payment ID"  error={touched.paymentID && Boolean(errors.paymentID)} helperText={touched.paymentID && errors.paymentID}/>
          <Field name="payment_purpose" as={TextField} label="Payment Purpose"  error={touched.payment_purpose && Boolean(errors.payment_purpose)} helperText={touched.payment_purpose && errors.payment_purpose}/>
          <Field name="user_age" as={TextField} label="Age" error={touched.user_age && Boolean(errors.user_age)} helperText={touched.user_age && errors.user_age} />
          <Field name="user_address" as={TextField} label="Address" error={touched.user_address && Boolean(errors.user_address)} helperText={touched.user_address && errors.user_address} />
          <Field name="user_city" as={TextField} label="City"  error={touched.user_city && Boolean(errors.user_city)} helperText={touched.user_city && errors.user_city}/>
          <Field name="user_state" as={TextField} label="State"  error={touched.user_state && Boolean(errors.user_state)} helperText={touched.user_state && errors.user_state}/>
          <Field name="user_pincode" as={TextField} label="Pincode"  error={touched.user_pincode && Boolean(errors.user_pincode)} helperText={touched.user_pincode && errors.user_pincode}/>
          <Field name="user_designation" as={TextField} label="Designation"  error={touched.user_designation && Boolean(errors.user_designation)} helperText={touched.user_designation && errors.user_designation}/>
          <Field name="user_diet" as={TextField} label="Diet"  error={touched.user_diet && Boolean(errors.user_diet)} helperText={touched.user_diet && errors.user_diet}/>
          <Field name="user_institution" as={TextField} label="Institution"  error={touched.user_institution && Boolean(errors.user_institution)} helperText={touched.user_institution && errors.user_institution}/>
          <Field name="user_medical_council_number" as={TextField} label="Medical Council Number" error={touched.user_medical_council_number && Boolean(errors.user_medical_council_number)} helperText={touched.user_medical_council_number && errors.user_medical_council_number} />
          <Field name="user_sex" as={TextField} label="Sex"  error={touched.user_sex && Boolean(errors.user_sex)} helperText={touched.user_sex && errors.user_sex}/>
          <FormControl>
            <InputLabel>Payment Method</InputLabel>
           <Field
                id="payment_method"
                name="payment_method"
                label="Payment Method"
                fullWidth
                variant="outlined"
                as={Select}
                defaultvalue={values.payment_method}
            >
                <MenuItem value="RTGS/NEFT/Cheque/DD">RTGS/NEFT/Cheque/DD</MenuItem>
                <MenuItem value="online">Online</MenuItem>
        
            </Field>
            </FormControl>
          <Grid container>
            <Grid item xs={9}>
            <Button type="submit" variant="contained">save</Button>
            </Grid>
            <Grid item xs={3}>
            <Button variant="contained" onClick={handleCloseAddEntryModal} color="error" startIcon={<CancelIcon />}>
                Cancel
             </Button>
            </Grid>
          </Grid>
          </Stack>
      </Form>
    )}
  </Formik>
  <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showEditBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SuccessSnackBar 
        open={showSuccessBar}
        message="Successfully added entry"
        handleClose={handleCloseSuccessBar}
      />

            </DialogContent>
        </Dialog>
        
  )
}
