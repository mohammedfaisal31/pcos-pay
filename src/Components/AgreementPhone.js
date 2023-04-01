import React, { useContext, useState } from 'react'
import NonResidentialRateCardPhone from './NonResidentialRateCardPhone'
import ResidentialRateCardPhone from './ResidentialRateCardPhone'
import { Button, Checkbox, FormControlLabel, Paper, Typography } from '@mui/material'
import { AgreementContext } from './Context/AgreementContext';
import { useNavigate } from 'react-router-dom'

export default function AgreementPhone() {
    const [isChecked, setIsChecked] = useState(false);
    const {proceed,updateProceed} = useContext(AgreementContext);
    
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const navigate = useNavigate();
    
    const handleAgreementProceedClick =  ()=>{
        updateProceed(true);
        navigate("/");    
    }
  
    return (
    <>
        <Paper sx={{padding:"5%"}} elevation={2}>
            <Typography variant="h5">Welcome, please go through all the packages below</Typography>
            <ul>
                <li>Click proceed at the bottom of the page(if you agree to the terms) </li>
                <li>Select your package in the next step</li>
                
            </ul>
            </Paper>
        <NonResidentialRateCardPhone />
        <ResidentialRateCardPhone/>
        <div style={{alignItems:"center",display:"flex",justifyContent:"center",flexDirection:"column",marginBottom:"3%"}}>
            <FormControlLabel
                control={
                <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
                 name="terms-and-conditions-checkbox"
                color="primary"
                sx={{color:"#ac2642"}}
            />

            }
            label="I agree to the terms and conditions"
            />
          <Button sx={{
                        backgroundColor:"#ac2642",
                        '&:hover': {
                            backgroundColor: '#d85165',
                          }
                }} variant="contained" disabled={!isChecked} onClick={handleAgreementProceedClick}>PROCEED</Button>
            </div >
    </>
  )
}
