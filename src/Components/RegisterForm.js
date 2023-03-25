import React,{useContext, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography,Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import axios from 'axios';
import { EmailContext } from './Context/EmailContext';
import { PhoneContext } from './Context/PhoneContext';
import { NameContext } from './Context/NameContext';
import { GatewayDataContext } from './Context/GatewayDataContext';
import { ModeContext } from './Context/ModeContext';
import ErrorSnackbar from './ErrorSnackBar';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required').min(3, "Please enter your name using at least 3 characters"),
  age: Yup.number().typeError("Must be a number").required('Required'),
  pincode: Yup.number().typeError("Must be a number").required('Required'),
 city: Yup.string().required('Required'),
  state: Yup.string("Invalid state").required('Required'),
  address: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  institution: Yup.string().required("Required"),
  medical_council_number: Yup.string().required("Required"),
  email: Yup.string().email("Whoops! We didn't recognise that email").required("Required"),
  
});

const initialValues = {
  salutation:'',
  name: '',
  designation:'',
  sex:'',
  institution:'',
  age:'',
  city:'',
  pincode:'',
  state:'',
  medical_council_number:'',
  membership_number:'',
  address:'',
  email: '',
  phone:'',
  diet:''

};

const RegisterForm = (props) => {
  const[phoneError, setPhoneError] = useState(false);
  const[sex, setSex] = useState("");
  const[salutation, setSalutation] = useState("");
  const[diet, setDiet] = useState("");
  
  
  const {email,updateEmail} = useContext(EmailContext);
  const {phone,updatePhone} = useContext(PhoneContext);
  const {name,updateName} = useContext(NameContext);
  const{gatewayData, updateGatewayData} = useContext(GatewayDataContext);
  const{mode, updateMode} = useContext(ModeContext);
  
  
  const handleDietChange = (e)=>{
    setDiet(e.target.value);
  }
  const handleSalutationChange = (e)=>{
    setSalutation(e.target.value);
  }
  const handleSexChange = (e)=>{
    setSex(e.target.value);
  }
  const handleSubmit = async (values, { resetForm }) => {
    return new Promise((resolve,reject)=>{
      console.log(values.phone);
      axios.post("https://kisargo.ml/detect-country",{phone:`+${values.phone}`})
      .then((result)=>{
        if(result.data["country_code"] !== "IN" && result.data["country_code"] !== "undefined"){
          updateMode("international");
          console.log("International")
        }
        if (result.data["country_code"] === "undefined"){
          console.log(result.data["country_code"])  
          setPhoneError(true);
          reject("Error")
        }
        if (result.data["country_code"] !== "undefined"){
          resolve("Success");
        }
      })
      .catch((err)=>console.log(err))
    })
    .then(()=>{
      const final_values = {
        salutation:salutation,
        name:values.name,
        designation:values.designation,
        sex:sex,
        institution:values.institution,
        age:values.age,
        city:values.city,
        pincode:values.pincode,
        state:values.state,
        medical_council_number:values.medical_council_number,
        membership_number:values.membership_number,
        address:values.address,
        diet: diet,
        phone:`+${values.phone}`,
        email:values.email,
        
      }
    console.log(final_values)                            
    props.onSubmit(final_values);
    
    updateEmail(final_values.email);
    updatePhone(final_values.phone);
    updateName(final_values.name);
    updateGatewayData(final_values);
    
    
    axios.post('https://kisargo.ml/api/register', final_values)
    .then(response => {
    console.log(response.data);
    if(response.data.status === "ok") props.onSuccess(true)
    })
    .catch(error => {
    console.error(error);
    });
    
    resetForm();
    })
    .catch(()=>console.log("Error"))
  };
  const handleClosePhoneError = ()=>{
    setPhoneError(false);
  }
  
  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors,isValid, touched ,dirty }) => (
        <Form>
          <ErrorSnackbar 
            open={phoneError}
            message="Invalid Phone number"
            handleClose={handleClosePhoneError}
          />
          <Field
                name="phone"
                component={MaterialPhoneInput}
                margin="normal"
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                style={{marginTop:"4.5%",marginBottom:"4.5%",textAlign:"left"}}

          /> 
          <Field
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            as={TextField}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
          />
          <Grid container spacing={2} alignItems="center">
            
            <Grid item xs={4}>
            <FormControl fullWidth >
              <InputLabel id="salutation">Salutation</InputLabel>
             <Select
               id="salutation"
                value={salutation}
                label="Salutation"
                name="salutation"
                required
                onChange={handleSalutationChange}
             >
                <MenuItem value={"Mr"}>Mr</MenuItem>
                <MenuItem value={"Ms"}>Ms</MenuItem>
                <MenuItem value={"Dr(Mr)"}>Dr(Mr)</MenuItem>
                <MenuItem value={"Dr(Ms)"}>Dr(Ms)</MenuItem>
                
             </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
            <Field
            name="name"
            label="Full Name"
            variant="outlined"
            margin="normal"
            as={TextField}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            fullWidth
          />
            </Grid>
      </Grid>
      
      
      <Grid container spacing={2} alignItems="center">
            
            
          <Grid item xs={8}>
          <Field
              name="institution"
              label="Institution/Hospital"
              variant="outlined"
              margin="normal"
              as={TextField}
              error={touched.institution && Boolean(errors.institution)}
              helperText={touched.institution && errors.institution}
              fullWidth
            />
            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="sex">Sex</InputLabel>
             <Select
               id="sex"
                value={sex}
                label="Sex"
                name="sex"
                required
                
                onChange={handleSexChange}
             >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                
             </Select>
          </FormControl>
        </Grid>
      </Grid>
          
          
          
      <Grid container spacing={2} alignItems="center">
            
            
            <Grid item xs={8}>
            <Field
            name="address"
            label="Address for correspondence"
            variant="outlined"
            margin="normal"
            as={TextField}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
            fullWidth
          />
              </Grid>
  
              <Grid item xs={4}>
              <Field
              name="age"  
              label="Age"
              variant="outlined"
              margin="normal"
              as={TextField}
              error={touched.age && Boolean(errors.age)}
              helperText={touched.age && errors.age}
              fullWidth
            />
          </Grid>
        </Grid>
            
        <Grid container spacing={2} alignItems="center">
            
            
            <Grid item xs={8}>
              <Field
              name="city"
              label="City"
              variant="outlined"
              margin="normal"
              as={TextField}
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
              fullWidth
            />
              </Grid>
  
              <Grid item xs={4}>
              <Field
              name="pincode"
              label="Pincode"
              variant="outlined"
              margin="normal"
              as={TextField}
              error={touched.pincode && Boolean(errors.pincode)}
              helperText={touched.pincode && errors.pincode}
              fullWidth
            />
          </Grid>
        </Grid>
        <Field
            name="state"
            label="State"
            variant="outlined"
            margin="normal"
            as={TextField}
            error={touched.state && Boolean(errors.state)}
            helperText={touched.state && errors.state}
            fullWidth
          />
          
          <Field
            name="medical_council_number"
            label="Medical Council Number"
            variant="outlined"
            margin="normal"
            as={TextField}
            error={touched.medical_council_number && Boolean(errors.medical_council_number)}
            helperText={touched.medical_council_number && errors.medical_council_number}
            fullWidth
          />
          
           
           
         {phoneError &&<Typography style={{fontSize:"12px",marginBottom:"5%"}}>Note: Please enter or select your country code first then enter phone number</Typography>}
          <Button type="submit" variant="contained" color="primary" disabled={!isValid } style={{backgroundColor:"#ef6223"}}>
            NEXT
          </Button>
        </Form>
      )}
    </Formik>

    
</>
  );
};


const MaterialPhoneInput = ({ field, form, ...props }) => {
  const { name, value } = field;
  const { setFieldValue } = form;
  const [countryCode, setCountryCode] = useState("")
  const handleChange = (value,data) => {
    setFieldValue(name, value);
    setCountryCode(data.dialCode);
  };

  return (
    <PhoneInput
      value={value}
      onChange={handleChange}
      defaultCountry="uk"
      inputClass="MuiInputBase-input MuiOutlinedInput-input"
      dropdownClass="MuiPaper-root MuiOutlinedInput-notchedOutline"
      containerClass="MuiFormControl-root MuiTextField-root"
      preferredCountries={['us','in','nz']}
      countryCodeEditable
      inputProps={{
        name: 'phone',
        required: true,
        autoFocus: true
      }}
      {...props}
    />
);
};

export default RegisterForm;
