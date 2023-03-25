import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

export default function RateCard() {
  return (
    <div style={{padding:"1%"}}>
    
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor:"#9d3d44"}}>
            <TableCell/>
            <TableCell align="center" sx={{fontSize:25,color:"#fff"}}>Non-residential package</TableCell>
            <TableCell/>
          </TableRow>
          <TableRow sx={{backgroundColor:"#7D2D33"}}>
            <TableCell></TableCell>
            <TableCell align="center" sx={{color:"#fff",fontFamily:'"Times New Roman", serif',fontWeight:"bold"}}>PCOS/ISAR/ASPIRE Members</TableCell>
            <TableCell align="center" sx={{color:"#fff",fontFamily:'"Times New Roman", serif',fontWeight:"bold"}}>Non Member</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{backgroundColor:"#E9DDDA"}}>
          <TableCell sx={{fontWeight:"bold"}}>All figures in INR for Indian Delegates and USD for international Delegates</TableCell>
          <TableCell >
              <TableCell>
              Till 15th April  
              </TableCell>  
              <TableCell>
              16th April to 15th May  
              </TableCell>  
              <TableCell>
              After 15th May  
              </TableCell>  
              <TableCell>
              After 7th June and Spot
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              Till 15th April  
              </TableCell>  
              <TableCell>
              16th April to 15th May  
              </TableCell>  
              <TableCell>
              After 15th May  
              </TableCell>  
              <TableCell>
              After 7th June and Spot
              </TableCell>  
              
          </TableCell>  
          </TableRow>

          <TableRow sx={{backgroundColor:"#DAC4BF"}}>
          <TableCell sx={{fontWeight:"bold"}}>*Conference + 2 Workshops</TableCell>
          <TableCell >
              <TableCell>
              13500 + 18% GST  
              </TableCell>  
              <TableCell>
              14500 + 18% GST  
              </TableCell>  
              <TableCell>
              15500 + 18% GST 
              </TableCell>  
              <TableCell>
              17000 + 18% GST
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              14500 + 18% GST  
              </TableCell>  
              <TableCell>
              15500 + 18% GST 
              </TableCell>  
              <TableCell>
              16500 + 18% GST  
              </TableCell>  
              <TableCell>
              18000 + 18% GST
              </TableCell>  
              
          </TableCell>  
          </TableRow>

          <TableRow sx={{backgroundColor:"#E9DDDA"}}>
          <TableCell sx={{fontWeight:"bold"}}>**Conference only</TableCell>
          <TableCell >
              <TableCell>
              8500 + 18% GST  
              </TableCell>  
              <TableCell>
              9500 + 18% GST  
              </TableCell>  
              <TableCell>
              10500 + 18% GST 
              </TableCell>  
              <TableCell>
              12000 + 18% GST
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              9500 + 18% GST  
              </TableCell>  
              <TableCell>
              10500 + 18% GST 
              </TableCell>  
              <TableCell>
              11500 + 18% GST  
              </TableCell>  
              <TableCell>
              13000 + 18% GST
              </TableCell>  
              
          </TableCell>  
          </TableRow>
          <TableRow sx={{backgroundColor:"#DAC4BF"}}>
          <TableCell sx={{fontWeight:"bold"}}>***Post Graduate Students Conference + 2 Workshops</TableCell>
          <TableCell >
              <TableCell>
              8000 + 18% GST  
              </TableCell>  
              <TableCell>
              9000 + 18% GST  
              </TableCell>  
              <TableCell>
              10000 + 18% GST 
              </TableCell>  
              <TableCell>
              11500 + 18% GST
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              9000 + 18% GST  
              </TableCell>  
              <TableCell>
              10000 + 18% GST 
              </TableCell>  
              <TableCell>
              11000 + 18% GST  
              </TableCell>  
              <TableCell>
              12500 + 18% GST
              </TableCell>  
              
          </TableCell>  
          </TableRow>
        <TableRow sx={{backgroundColor:"#7D2D33"}}>
          <TableCell/>
          <TableCell sx={{textAlign:"center",color:"#fff"}}>Inclusive of GST for International Delegates in USD</TableCell>
          <TableCell/>
        </TableRow>
        <TableRow sx={{backgroundColor:"#E9DDDA"}}>
          <TableCell sx={{fontWeight:"bold"}}>*International Delegates Conference + 2 Workshops</TableCell>
          <TableCell >
              <TableCell>
              200 USD  
              </TableCell>  
              <TableCell>
              225 USD  
              </TableCell>  
              <TableCell>
              250 USD
              </TableCell>  
              <TableCell>
              275 USD
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              225 USD 
              </TableCell>  
              <TableCell>
              250 USD
              </TableCell>  
              <TableCell>
              275 USD  
              </TableCell>  
              <TableCell>
              300 USD
              </TableCell>  
              
          </TableCell>  
          </TableRow>
          <TableRow sx={{backgroundColor:"#DAC4BF"}}>
          <TableCell sx={{fontWeight:"bold"}}>**International Delegates Conference only</TableCell>
          <TableCell >
              <TableCell>
              125 USD  
              </TableCell>  
              <TableCell>
              150 USD  
              </TableCell>  
              <TableCell>
              175 USD
              </TableCell>  
              <TableCell>
              200 USD
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              150 USD 
              </TableCell>  
              <TableCell>
              175 USD
              </TableCell>  
              <TableCell>
              200 USD  
              </TableCell>  
              <TableCell>
              225 USD
              </TableCell>  
              
          </TableCell>  
          </TableRow>
          <TableRow>
            
            
          </TableRow>
          <TableRow></TableRow>
          <TableRow></TableRow>
          
        </TableBody>
      </Table>
      <Typography sx={{marginTop:"5%",color:"#7D2D33",fontWeight:"bold"}}>* Conference + Workshop Registration Includes:</Typography>
      <Typography>Entry to any 2 Pre Congress Workshops ■ Conference registration and kit ■ 3 Lunches and 2 Dinners</Typography>
      
      <Typography sx={{marginTop:"5%",color:"#7D2D33",fontWeight:"bold"}}>** Conference only</Typography>
      <Typography>Conference registration and kit ■ 2 Lunches and 1 Dinner</Typography>
      
      <Typography sx={{marginTop:"5%",color:"#7D2D33",fontWeight:"bold"}}>*** Post-Graduate Students</Typography>
      <Typography>Entry to any 2 Pre Congress Workshops ■ Conference registration and kit ■ 3 Lunches </Typography>
      
      <Typography sx={{marginTop:"2%",color:"#7D2D33",fontWeight:"bold"}}>(Letter from HOD is essential to register as PG Student)</Typography>
    </TableContainer>
    
    </div>
  )
}
