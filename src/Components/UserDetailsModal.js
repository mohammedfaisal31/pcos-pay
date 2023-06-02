import { Backdrop, Box, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import SuccessSnackBar from './SuccessSnackBar';
import dayjs from "dayjs";
import ErrorSnackbar from './ErrorSnackBar';

const clickhereButton = {
  background: "none",
  border: "none",
  color: "blue",
  textDecoration: "underline",
  cursor: "pointer",
  marginTop:"2%"
}
  const formattedData = (data)=>{
    if (!Array.isArray(data) || !data.length) {
      return [];
    }
  
    return data.map(row => {
      const newRow = {};
      row["conference_type"] = row["payment_purpose"].replace("Opted for ","")
      let workshop_titles =  JSON.parse(row["workshop_titles"])
      //console.log(workshop_titles)
      for(let i=0;i<workshop_titles.length;i++){
        console.log(workshop_titles[i])
        if(workshop_titles[i] === "check1") workshop_titles[i] = "Insulin Resistance in PCOS"
        else if(workshop_titles[i] === "check2") workshop_titles[i] = "Embryo Biopsy and PGT"
        else if(workshop_titles[i] === "check3") workshop_titles[i] = "Body Image and PCOS"
        else if(workshop_titles[i] === "check4") workshop_titles[i] = "Ultrasound in PCOS"
        else if(workshop_titles[i] === "check5") workshop_titles[i] = "Vitrification of Oocytes and Embryos"
        else if(workshop_titles[i] === "check6") workshop_titles[i] = "Errors in ART"
        else continue
        
      }
      //console.log(JSON.stringify(workshop_titles))
      row["workshop_titles"] = JSON.stringify(workshop_titles);
      return row;
    });
      
    
  }
export default function UserDetailsModal(props) {
  
  useEffect(() => {
    if (props.data === null) console.log("Cannot set properties yet")
    else {
      if(props.data.package_type === "residential"){
        setShowDatePickers(true);
        setCheckInDate(props.data.check_in_date);
        setCheckOutDate(props.data.check_out_date);
        setAccomodationEnabled(true);
        if(props.data.conference_type === "conference_type_1" || props.data.conference_type === "conference_type_4") setShowChecks(true);
        else setShowChecks(false);
        if(props.data.conference_type === "conference_type_1" || props.data.conference_type === "conference_type_2") setDaysToAddtoMax(2)
        else setDaysToAddtoMax(1);
      } 
      else {
        setAccomodationEnabled(false) 
        setShowDatePickers(false);
        if(props.data.conference_type === "conference_type_2" || props.data.conference_type === "conference_type_3" || props.data.conference_type === "conference_type_4") setShowChecks(true);
        else setShowChecks(false);
      }
      if(props.data.member_type === "member"){
        setShowMemNum(true);
      }
      else {
        setShowMemNum(false);
      }
      setChecked(JSON.parse(props.data.workshop_titles))

      if(props.data.package_type === "residential" && props.data.accomodation_type === "single_room") setShowAccompanyingPersonOption(true)
      else setShowAccompanyingPersonOption(false);

      if(props.data.accompanying_total_amount !== 0){
        setAccompanyingPersonOption("needed")
        setShowAccompanyingPersonOption(true);
      }
      else {
        setAccompanyingPersonOption("not_needed")
      }
      if(props.data.amount !== 0){
        setAmountPaid(props.data.amount)
      }
      else {
        setAmountPaid(0)
      }
      
      if(props.data.accompanying_total_amount && props.data.amount) setGrandTotalAmount(props.data.accompanying_total_amount+props.data.amount)
     
    }
    
  }, [props])
  
  const validationSchema = Yup.object().shape({
    accomodation_type: Yup.string().required("accomodation type is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    conference_type: Yup.string().required("Conference type is required"),
    date_of_transaction: Yup.date().required("Date of transaction is required"),
    member_type: Yup.string().required("Member type is required"),
    package_type: Yup.string().required("Package type is required"),
    paymentID: Yup.string().required("Payment ID is required"),
    paymentStatus: Yup.string().required("Payment status is required"),
    payment_purpose: Yup.string().required("Payment purpose is required"),
    time_of_transaction: Yup.date().required("Time of transaction is required"),
    transaction_id: Yup.string().required("Transaction ID is required"),
    accompanying_person_enabled :Yup.string().when("accomodation_type", {
      is: "single_room"  ,
      then: ()=>  Yup.string().required("Please select an option"),
      otherwise: ()=> Yup.string().notRequired(),
    }),
    // user_address: Yup.string().required("User address is required"),
    // user_age: Yup.number().required("User age is required").positive("User age must be positive"),
    // user_city: Yup.string().required("User city is required"),
    // user_designation: Yup.string().required("User designation is required"),
    // user_diet: Yup.string().required("User diet is required"),
    // user_email: Yup.string().email("Invalid email").required("User email is required"),
    // user_institution: Yup.string().required("User institution is required"),
    // user_medical_council_number: Yup.string().required("User medical council number is required"),
    // user_membership_number: Yup.string().required("User membership number is required"),
    // user_name: Yup.string().required("User name is required"),
    // user_phone: Yup.string().required("User phone is required"),
    // user_pincode: Yup.string().required("User pincode is required"),
    // user_salutation: Yup.string().required("User salutation is required"),
    // user_sex: Yup.string().required("User sex is required"),
    // user_state: Yup.string().required("User state is required"),
    // workshop_titles: Yup.string().required("Workshop titles is required")
  });
    
    const handleCloseDetailsModal = ()=>{
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
       workshop_titles: ""
       };
      const[paymentStatus,setPaymentStatus] = useState(initialValues.paymentStatus)
      const paymentStatusOptions = ["success", "failed", "pending"];
      const [showEditBackdrop ,setShowEditBackdrop] = useState(false);
      const [showSuccessBar ,setShowSuccessBar] = useState(false);
      const [checkInDate, setCheckInDate] = useState(null);
      const [memNumValid, setMemNumValid] = useState(true);
      const [accompanyingPersonOption, setAccompanyingPersonOption] = useState("");
      const [showAccompanyingPersonOption, setShowAccompanyingPersonOption] = useState("");
      const [amount_paid, setAmountPaid] = useState(0);
      const [accompanying_amount, setAccompanyingAmount] = useState(0)
      const[grandTotalAmount,setGrandTotalAmount] = useState(0);
      const [checkOutDate, setCheckOutDate] = useState(null);
      
      const [showChecks, setShowChecks] = useState(true);
      const handleResetWorkshops = ()=>{
        setChecked([]);
      }

      const [checked, setChecked] = useState([]);
      const [accomodationEnabled, setAccomodationEnabled] = useState(false);
      const [showMemNum, setShowMemNum] = useState(true);
      const [showDatePickers, setShowDatePickers] = useState(true);
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
      const handleCloseSuccessBar = ()=>{
        setShowSuccessBar(false);
      }
      const handleSubmit = (values) => {
          setShowEditBackdrop(true);
          values.workshop_titles = JSON.stringify(checked);
          console.log(values);
          axios.post("https://kisargo.ml/api/updateTransactionData",values)
          .then((result)=>{
            console.log(result)
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
          onClose={handleCloseDetailsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{minWidth:"650px"}}
        > 
      <DialogTitle> 
          <Grid container>
            <Grid item xs={9}>
              <Typography>Edit Full Details</Typography>
            </Grid>
            <Grid item xs={3}>
            <Button variant="contained" onClick={handleCloseDetailsModal} sx={{color:"#000"}} startIcon={<CancelIcon />}>
                Cancel
             </Button>
            </Grid>
          </Grid>
      </DialogTitle>
            <DialogContent sx={{minWidth:"500px"}}>
            <Formik
    initialValues={props.data}
    onSubmit={handleSubmit}
  >
    {({ values, errors, touched ,resetForm,setFieldValue}) => (
      <Form>
         <Stack spacing={2} sx={{marginTop:"5%"}}>
         <Field name="user_phone" as={TextField} label="Phone"  />
          <Field name="user_email" as={TextField} label="Email"  />
          <Field name="user_salutation" as={TextField} label="Salutation"  />
          <Field name="user_name" as={TextField} label="Name"  />
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
            setChecked([])
            setCheckInDate("");
            setCheckOutDate("");
            setShowDatePickers(false);
            setShowMemNum(false);
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
            setFieldValue("member_type", '');
            setFieldValue("user_membership_number", '');
            setFieldValue("conference_type", '');
            setChecked([])
            setCheckInDate("");
            setCheckOutDate("");
            setShowDatePickers(false);
            setShowMemNum(false);
            if(e.target.value === "single_room") setShowAccompanyingPersonOption(true)
            else setShowAccompanyingPersonOption(false);
            
          }}
          inputProps={{
            name: "accomodation_type",
            id: "accomodation_type",
          }}
        >
          <option value=""></option>
          <option value="single_room">Single Room</option>
          <option value="twin_room">Twin Sharing per person</option>
        </Select>
        {accomodationEnabled && touched.accomodation_type && errors.accomodation_type && (
          <FormHelperText>{errors.accomodation_type}</FormHelperText>
        )}
      </FormControl>}
          
    {showAccompanyingPersonOption &&
    <FormControl sx={{marginTop:"4%",marginBottom:"4%",textAlign:"left"}}  required>
      <FormLabel id="demo-radio-buttons-group-label">Additional Accomodation for accompanying person</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={accompanyingPersonOption}
        name="accompanying_person_enabled"
        onChange={(e)=>{
          if(e.target.value === "not_needed"){
            setAccompanyingAmount(0);
            setFieldValue("accompanying_total_amount",0)
          } 
          setAccompanyingPersonOption(e.target.value);
        }}
      >
        <FormControlLabel  value="needed" control={<Radio />} label="Additional accommodation needed for accompanying person" />
        <FormControlLabel  value="not_needed" control={<Radio />} label="Additional accommodation not required" />
      </RadioGroup>
      {touched.accompanying_person_enabled && errors.accompanying_person_enabled && (
          <>
          <ErrorSnackbar open={errors.accompanying_person_enabled} message="Please specify if additional accommodation is required"/>
          <FormHelperText sx={{color:"red",fontWeight:"bold",fontSize:"large"}}>{errors.accompanying_person_enabled}</FormHelperText></>
        )}
    </FormControl>
}

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
           setFieldValue("user_membership_number", '');
           setFieldValue("conference_type", '');
            setChecked([])
            setCheckInDate("");
            setCheckOutDate("");
            setShowDatePickers(false);
            setShowChecks(false);
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
        value={values.user_membership_number}
        label="Membership Number"
        onChange={(e)=>{
          setFieldValue("user_membership_number", e.target.value);
          setMemNumValid(/^(LM|PM|AM|ASPIRE|ISAR|lm|pm|am|aspire|isar)-(\d{1,4}|\d{6})$/.test(e.target.value));
          
        }}
        variant="outlined"
        inputProps={{
          name: "user_membership_number",
          id: "user_membership_number",
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
        <InputLabel htmlFor="conference_type">Conference and Workshop Selection</InputLabel>
        <Select
          native
          value={values.conference_type}
          label="Conference and Workshop Selection"
          onChange={(e)=>{
            if(e.target.value === "conference_type_1" || e.target.value === "conference_type_4") setShowChecks(true);
            else setShowChecks(false);
            if(e.target.value === "conference_type_1" || e.target.value === "conference_type_2") setDaysToAddtoMax(2)
            else setDaysToAddtoMax(1);
            setFieldValue("conference_type", e.target.value);
            setShowDatePickers(true);
            setCheckInDate("");
            setCheckOutDate("");
            setChecked([]);
            
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
          <option value="conference_type_4">2 Workshops only with 1 lunch and 1 dinner</option>
          
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
            if(e.target.value === "conference_type_2" || e.target.value === "conference_type_3" || e.target.value === "conference_type_4") setShowChecks(true)
            else setShowChecks(false);
            setFieldValue("conference_type", e.target.value);
            setCheckInDate("");
            setCheckOutDate("");
            setChecked([]);
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
          <option value="conference_type_4">Workshops only</option>
          
        </Select>
        {touched.conference_type && errors.conference_type && (
          <FormHelperText>{errors.conference_type}</FormHelperText>
        )}
      </FormControl>
      }
      {showDatePickers && 
      <>
      <FormControl fullWidth margin="normal"  name="checkin_date">
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
                min: "2023-06-08",
                max: "2023-06-12",
              }}
              onChange={handleCheckInDateChange}
              required
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
          control={<Checkbox checked={checked.includes('check1')} onChange={handleCheckChange} name="check1"  />}
          label="Insulin Resistance in PCOS"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check2')} onChange={handleCheckChange} name="check2"  />}
          label="Embryo Biopsy and PGT"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check3')} onChange={handleCheckChange} name="check3"  />}
          label="Body Image and PCOS"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check4')} onChange={handleCheckChange} name="check4"  />}
          label="Ultrasound in PCOS"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check5')} onChange={handleCheckChange} name="check5"  />}
          label="Vitrification of Oocytes and Embryos"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.includes('check6')} onChange={handleCheckChange} name="check6"  />}
          label="Errors in ART"
        />
      </FormGroup>
    </FormControl>
    <Typography><button style={clickhereButton} onClick={handleResetWorkshops}>Click here</button>to reset Workshops preferences</Typography>
    </>
    }
   
   {accompanyingPersonOption === "needed" ? 
            <>
              <TextField
                label="Amount paid for package(includng GST)"
                value={amount_paid}
                onChange={(e)=>{
                
                setFieldValue("amount",(isNaN(parseInt(e.target.value))) ? 0 : parseInt(e.target.value) );
                setAmountPaid((isNaN(parseInt(e.target.value))) ? 0 : parseInt(e.target.value) );
                setGrandTotalAmount("Enter amount paid for accompanying person ")
              }}
              inputProps={{
                name: "amount",
                id: "amount",
            }}
                variant="outlined"
                
            />
              <TextField
                value={values.accompanying_total_amount}
                label="Amount paid for accompanying person(includng GST)"
                onChange={(e)=>{
                setGrandTotalAmount(amount_paid)
                setFieldValue("accompanying_total_amount",(isNaN(parseInt(e.target.value))) ? 0 : parseInt(e.target.value) );
                setAccompanyingAmount(parseInt(e.target.value));
                setGrandTotalAmount(amount_paid+parseInt(e.target.value));
              }}
                variant="outlined"
                inputProps={{
                  name: "accompanying_total_amount",
                  id: "accompanying_total_amount",
              }}
            />
              <Field
                value={(grandTotalAmount) ? (grandTotalAmount) : 0}
                label="Grand Total amount paid"
                variant="outlined"
                as={TextField}
            />
            
            </>
            :
            <Field name="amount" as={TextField} label="Total amount paid(including GST)"  error={touched.amount && Boolean(errors.amount)} helperText={touched.amount && errors.amount}/>
          
            }
   
          <Field name="paymentID" as={TextField} label="Payment ID"  />
           <FormControl name="paymentStatus">
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
          <Field name="payment_purpose" as={TextField} label="Payment Purpose"  />
          <Field name="user_age" as={TextField} label="Age"  />
          <Field name="user_address" as={TextField} label="Address"  />
          <Field name="user_city" as={TextField} label="City"  />
          <Field name="user_state" as={TextField} label="State"  />
          <Field name="user_pincode" as={TextField} label="Pincode"  />
          <Field name="user_designation" as={TextField} label="Designation"  />
          <Field name="user_diet" as={TextField} label="Diet"  />
          <Field name="user_institution" as={TextField} label="Institution"  />
          <Field name="user_medical_council_number" as={TextField} label="Medical Council Number"  />
          <Field name="user_sex" as={TextField} label="Sex"  />
          <Field name="payment_method" as={TextField} label="Payment Method"  />
          
          <Grid container>
            <Grid item xs={9}>
            <Button type="submit" variant="contained">save</Button>
            </Grid>
            <Grid item xs={3}>
            <Button variant="contained" onClick={handleCloseDetailsModal} color="error" startIcon={<CancelIcon />}>
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
        message="Edited Successfully"
        handleClose={handleCloseSuccessBar}
      />

            </DialogContent>
        </Dialog>
        
  )
}
