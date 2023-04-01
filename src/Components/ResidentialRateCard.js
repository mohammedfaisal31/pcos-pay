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
    <div style={{marginTop:"5%",padding:"1%"}}>
    <TableContainer component={Paper}>
      

<Table aria-label="simple table">
      <TableHead>
      <TableRow>
      <TableCell colSpan={9} style={{backgroundColor:"#f48c5a",fontSize:25,color:"#fff",textAlign:"center",borderRadius:"2px",marginBottom:"0.2%"}}>Residential package</TableCell>
        
      </TableRow>
          <TableRow sx={{backgroundColor:"#ef6223"}}>
            <TableCell sx={{ width: '10%',border:"1px solid black" }}>
            </TableCell>
            <TableCell colspan={4} sx={{ border:"1px solid black",textAlign:"center",color:"#fff",borderLeft:"3px solid #f48c5a",fontWeight:"bold" }}>
              PCOS/ISAR/ASPIRE Members
            </TableCell>
            <TableCell colspan={4} sx={{ border:"1px solid black" ,textAlign:"center",color:"#fff",borderLeft:"3px solid #f48c5a",fontWeight:"bold" }}>
              Non Member
            </TableCell>
            
          </TableRow>
        </TableHead>
        
        <TableBody>
          <TableRow sx={{backgroundColor:"#FEEBDF"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black',width:"10%"}}>All figures in INR for Indian Delegates and USD for international Delegates</TableCell>
              <TableCell sx={{color:"#585656",fontWeight:"bold",border:" 1px solid black",borderLeft:"3px solid #f48c5a" }}>
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
              
              <TableCell sx={{color:"#585656",fontWeight:"bold",border: '1px solid black',borderLeft:"3px solid #f48c5a" }}>
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

          <TableRow sx={{backgroundColor:"#FDDBC5"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black'}}>*Conference + 2 Workshops</TableCell>
              <TableCell sx={{ border: '1px solid black'  ,borderLeft:"3px solid #f48c5a"  }}>
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
              
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #f48c5a"  }}>
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

          <TableRow sx={{backgroundColor:"#FEEBDF"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black'}}>**Conference only</TableCell>
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #f48c5a"  }}>
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
              
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #f48c5a" }}>
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
          <TableRow sx={{backgroundColor:"#FDDBC5"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black'}}>***Post Graduate Students Conference + 2 Workshops</TableCell>
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #f48c5a"  }}>
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
              
              <TableCell sx={{ border: '1px solid black' ,borderLeft:"3px solid #f48c5a"}}>
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
            <TableCell colspan={9} sx={{backgroundColor:"#ef6223",textAlign:"center",color:"#fff",fontWeight:"bold"}}>Inclusive of GST for International Delegates in USD</TableCell>
         </TableRow>
        <TableRow sx={{backgroundColor:"#FEEBDF"}}>
          <TableCell sx={{fontWeight:"bold",border: '1px solid black' }}>*International Delegates Conference + 2 Workshops</TableCell>
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #f48c5a" }}>
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
              
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #f48c5a" }}>
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
          <TableRow sx={{backgroundColor:"#FDDBC5"}}>
          <TableCell sx={{fontWeight:"bold", border: '1px solid black'}}>**International Delegates Conference only</TableCell>
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #f48c5a" }}>
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
              
              <TableCell sx={{ border: '1px solid black',borderLeft:"3px solid #f48c5a" }}>
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





      <Typography sx={{marginTop:"5%",color:"#ab6a4a",fontWeight:"bold"}}>In case additional room night is required for 1 more day Please contact us by 30th April</Typography>
      <Typography sx={{marginTop:"3%",color:"#ab6a4a",fontWeight:"bold"}}>* Conference + Workshop Registration Includes + 2 nights reserved</Typography>
      <Typography>Entry to any 2 Pre Congress Workshops ■ Conference registration and kit ■ 3 Lunches and 2 Dinners ■ 2 Room nights</Typography>
      
      <Typography sx={{marginTop:"3%",color:"#ab6a4a",fontWeight:"bold"}}>** Conference only + No of nights reserved</Typography>
      <Typography>Conference registration and kit ■ 2 Lunches and 1 Dinners ■ 1 or 2 room nights depending on pakage</Typography>
      <Typography>
        <ul>
          <li style={{fontWeight:"bold"}}>Check-in time is 14:00 hours and check-out time is 12:00 hours</li>
          <li>Early arrival before 14:00 hours or a late departure beyond 12.00 hours will be charged @ 50% of the room rates.</li>
          <li>Early arrival before 7:00 hours or late departure after 18:00 hours will be charged @ 100% of the room rates.</li>
          <li>Accommodation at the venue is on first come first basis.</li>
        </ul>
      </Typography>
      
      <Typography sx={{marginTop:"3%",color:"#ab6a4a",fontWeight:"bold"}}>Accompanying Person for Residential Package</Typography>
      <Typography>
        <ul>
          <li>Permitted only with delegates registering in a ‘Single Room’</li>
          <li>Rs 11,000/- + 1980 (18% GST) = 12980 (Includes 2 breakfasts, 2 lunches, 1 dinner for 2 nights and 3 days package)</li>
          <li>Rs 9500 + 1710 (18% GST) = 11210 (Includes 1 breakfast, 2 lunches, 1 dinner for 1 nights and 2 days package)</li>
        </ul>
      </Typography>
      
    </TableContainer>
    
    </div>
  )
}
