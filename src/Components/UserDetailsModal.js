import { Backdrop, Box, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import SuccessSnackBar from './SuccessSnackBar';

  
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
      
      const handleCloseSuccessBar = ()=>{
        setShowSuccessBar(false);
      }
      const handleSubmit = (values) => {
          setShowEditBackdrop(true);
          console.log(values);
          axios.post("https://kisargo.ml/api/updateTransactionData",values)
          .then((result)=>{
            console.log(result)
            setShowEditBackdrop(false);
            setShowSuccessBar(true);
          })
          .catch((err)=>console.log(err))
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
    {({ values, errors, touched }) => (
      <Form>
         <Stack spacing={2} sx={{marginTop:"5%"}}>
         
          <Field name="user_phone" as={TextField} label="Phone"  />
          <Field name="user_email" as={TextField} label="Email"  />
          <Field name="user_salutation" as={TextField} label="Salutation"  />
          <Field name="user_name" as={TextField} label="Name"  />
          <Field name="accomodation_type" as={TextField} label="Accomodation Type"  />
          <Field name="amount" as={TextField} label="Amount paid"  />
          <Field name="conference_type" as={TextField} label="Type of conference"  />
          <Field name="member_type" as={TextField} label="Membership type"  />
          <Field name="package_type" as={TextField} label="Package Type"  />
          <Field name="paymentID" as={TextField} label="Payment ID"  />
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
          <Field name="user_membership_number" as={TextField} label="Membership Number"  />
          <Field name="user_sex" as={TextField} label="Sex"  />
          <Field name="workshop_titles" as={TextField} label="Workshop Titles"  />
          <Field name="check_in_date" as={TextField} label="Check In date"  />
          <Field name="check_out_date" as={TextField} label="Check out Date"  />
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
