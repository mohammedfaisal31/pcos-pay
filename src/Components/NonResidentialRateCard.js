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
      <TableRow>
      <TableCell colSpan={9} style={{backgroundColor:"#d84a5e",fontSize:25,color:"#fff",textAlign:"center",borderRadius:"2px",marginBottom:"0.2%"}}>Non Residential package</TableCell>
        
      </TableRow>
          <TableRow sx={{backgroundColor:"#ac2642"}}>
            <TableCell sx={{ width: '10%',border:"1px solid black" }}>
            </TableCell>
            <TableCell colspan={4} sx={{ border:"1px solid black",textAlign:"center",color:"#fff",borderLeft:"3px solid #9d3d44",fontWeight:"bold" }}>
              PCOS/ISAR/ASPIRE Members
            </TableCell>
            <TableCell colspan={4} sx={{ border:"1px solid black" ,textAlign:"center",color:"#fff",borderLeft:"3px solid #9d3d44",fontWeight:"bold" }}>
              Non Member
            </TableCell>
            
          </TableRow>
        </TableHead>
        
        <TableBody>
          <TableRow sx={{backgroundColor:"#E9DDDA"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black',width:"10%"}}>All figures in INR for Indian Delegates and USD for international Delegates</TableCell>
              <TableCell sx={{color:"#585656",fontWeight:"bold",border:" 1px solid black",borderLeft:"3px solid #9d3d44" }}>
              Till 15th April  
              </TableCell>  
              <TableCell sx={{color:"#585656",fontWeight:"bold",border:" 1px solid black"}}>
              16th April to 15th May  
              </TableCell >  
              <TableCell sx={{color:"#585656",fontWeight:"bold",border:" 1px solid black"}}>
              After 15th May  
              </TableCell>  
              <TableCell sx={{color:"#585656",fontWeight:"bold",width:"11.25",border: '1px solid black'}}>
              After 7th June and Spot
              </TableCell>  
              
              <TableCell sx={{color:"#585656",fontWeight:"bold",border: '1px solid black',borderLeft:"3px solid #9d3d44" }}>
              Till 15th April  
              </TableCell>  
              <TableCell sx={{color:"#585656",fontWeight:"bold",border: '1px solid black'}}>
              16th April to 15th May  
              </TableCell>  
              <TableCell sx={{color:"#585656",fontWeight:"bold",border: '1px solid black'}}>
              After 15th May  
              </TableCell>  
              <TableCell sx={{color:"#585656",fontWeight:"bold",border: '1px solid black'}}>
              After 7th June and Spot
              </TableCell>  
              
          </TableRow>

          <TableRow sx={{backgroundColor:"#DAC4BF"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black'}}>*Conference + 2 Workshops</TableCell>
              <TableCell sx={{ border: '1px solid black'  ,borderLeft:"3px solid #9d3d44"  }}>
              13500 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              14500 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black' }}>
              15500 + 18% GST 
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              17000 + 18% GST
              </TableCell>  
              
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #9d3d44"  }}>
              14500 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              15500 + 18% GST 
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              16500 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              18000 + 18% GST
              </TableCell>  
              
          </TableRow>

          <TableRow sx={{backgroundColor:"#E9DDDA"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black'}}>**Conference only</TableCell>
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #9d3d44"  }}>
              8500 + 18% GST  
              </TableCell >  
              <TableCell sx={{ border: '1px solid black', }}>
              9500 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              10500 + 18% GST 
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              12000 + 18% GST
              </TableCell>  
              
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #9d3d44" }}>
              9500 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              10500 + 18% GST 
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              11500 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              13000 + 18% GST
              </TableCell>  
              
          </TableRow>
          <TableRow sx={{backgroundColor:"#DAC4BF"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black'}}>***Post Graduate Students Conference + 2 Workshops</TableCell>
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #9d3d44"  }}>
              8000 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              9000 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              10000 + 18% GST 
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              11500 + 18% GST
              </TableCell >  
              
              <TableCell sx={{ border: '1px solid black' ,borderLeft:"3px solid #9d3d44"}}>
              9000 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              10000 + 18% GST 
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              11000 + 18% GST  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              12500 + 18% GST
              </TableCell>  
              
          </TableRow>
          <TableRow>
            <TableCell colspan={9} sx={{backgroundColor:"#ac2642",textAlign:"center",color:"#fff",fontWeight:"bold"}}>Inclusive of GST for International Delegates in USD</TableCell>
         </TableRow>
        <TableRow sx={{backgroundColor:"#E9DDDA"}}>
          <TableCell sx={{fontWeight:"bold",border: '1px solid black' }}>*International Delegates Conference + 2 Workshops</TableCell>
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #9d3d44" }}>
              200 USD  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              225 USD  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}> 
              250 USD
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              275 USD
              </TableCell>  
              
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #9d3d44" }}>
              225 USD 
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              250 USD
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              275 USD  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              300 USD
              </TableCell>  
              
          </TableRow>
          <TableRow sx={{backgroundColor:"#DAC4BF"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black'}}>**International Delegates Conference only</TableCell>
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #9d3d44" }}>
              125 USD  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              150 USD  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              175 USD
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              200 USD
              </TableCell>  
              
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #9d3d44" }}>
              150 USD 
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              175 USD
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              200 USD  
              </TableCell>  
              <TableCell sx={{ border: '1px solid black', }}>
              225 USD
              </TableCell>  
              
            
            
          </TableRow>
          
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
