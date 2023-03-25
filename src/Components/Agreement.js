import { Icon, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Footer from './Footer.js'
import NonResidentialRateCard from "./NonResidentialRateCard.js"
import ResidentialRateCard from "./ResidentialRateCard.js"
import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';


export default function Agreement(props) {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const handleAgreementProceedClick = ()=>{
        props.onAgreementProceedClicked(true);
    }
    return (
    <div style={{alignItems:"center",display:"flex",justifyContent:"center",flexDirection:"column"}}>
        <h2 style={{textAlign:"center"}}>"There is more to PCOS and ART... Beyond the obvious”</h2>
        <h3>Welcome, Please go through the packages and click proceed below</h3>
          
        <Paper  elevation={5} sx={{ width:window.innerWidth-500}}>
            
            <NonResidentialRateCard/>
            <ResidentialRateCard />
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
          <Button sx={{backgroundColor:"#ac2642"}} variant="contained" disabled={!isChecked} onClick={handleAgreementProceedClick}>PROCEED</Button>
            </div >
        </Paper>
        <Footer/>
    </div>
  )
}
