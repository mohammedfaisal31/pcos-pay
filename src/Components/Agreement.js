import { Icon, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer.js'
import NonResidentialRateCard from "./NonResidentialRateCard.js"
import ResidentialRateCard from "./ResidentialRateCard.js"
import { Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { AgreementContext } from './Context/AgreementContext.js'
import { useNavigate } from 'react-router-dom'


export default function Agreement(props) {
    const[screenWidthRatio , setScreenWidthRatio] = useState(0)
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const {proceed,updateProceed} = useContext(AgreementContext);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const handleAgreementProceedClick =  ()=>{
        updateProceed(true);
        navigate("/");    
    }
    
    
    
  
    useEffect(() => {
    function handleResize() {
        const width = window.innerWidth;
        if(width > 1294) 
            setScreenWidthRatio(width-600);
        else if (width > 999 && width <= 1294) 
            setScreenWidthRatio(width-400) 
        else if (width > 500 && width <= 999) 
            setScreenWidthRatio(width-150) 
        else if (width > 300 && width <= 500) 
            setScreenWidthRatio(width-100) 
            
                
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
        const width = window.innerWidth;
        if(width > 1294) 
            setScreenWidthRatio(width-600);
        else if (width > 999 && width <= 1294) 
            setScreenWidthRatio(width-400) 
        else if (width > 500 && width <= 999) 
            setScreenWidthRatio(width-150) 
        else if (width > 300 && width <= 500) 
            setScreenWidthRatio(width-100) 
            
                
  }, []);


    
    return (
    <>
    <div style={{alignItems:"center",display:"flex",justifyContent:"center",flexDirection:"column"}}>
        <h2 style={{textAlign:"center",marginTop:"2%"}}>"There is more to PCOS and ART... Beyond the obvious”</h2>
        <h3 variant='h5' style={{textAlign:"center",marginTop:"2%",marginBottom:"2%"}}>Welcome, Please go through the packages and click proceed below</h3>
          
        <Paper  elevation={5} sx={{ width:screenWidthRatio}}>
            
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
       
    </div>
    </>
  )
}
