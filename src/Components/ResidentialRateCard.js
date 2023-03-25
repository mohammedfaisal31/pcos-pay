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
          <TableRow sx={{backgroundColor:"#e59a73"}}>
            <TableCell/>
            <TableCell align="center" sx={{fontSize:25,color:"#fff"}}>Residential package</TableCell>
            <TableCell/>
          </TableRow>
          <TableRow sx={{backgroundColor:"#F48E5A"}}>
            <TableCell></TableCell>
            <TableCell align="center" sx={{color:"#fff",fontFamily:'"Times New Roman", serif',fontWeight:"bold"}}>PCOS/ISAR/ASPIRE Members</TableCell>
            <TableCell align="center" sx={{color:"#fff",fontFamily:'"Times New Roman", serif',fontWeight:"bold"}}>Non Member</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{backgroundColor:"#FEEBDF"}}>
          <TableCell sx={{fontWeight:"bold"}}>All figures in INR for Indian Delegates and USD for international Delegates</TableCell>
          <TableCell >
              <TableCell>
              Till 15th April - Single Room  
              </TableCell>  
              <TableCell>
              Till 15th April - Twin Sharing per person 
              </TableCell>  
              <TableCell>
              16th April to 15th May - Single Room
              </TableCell>  
              <TableCell>
              16th April to 15th May - Twin Sharing per person  
              </TableCell>  
              
          </TableCell> 
          <TableCell >
              <TableCell>
              Till 15th April - Single Room  
              </TableCell>  
              <TableCell>
              Till 15th April - Twin Sharing per person 
              </TableCell>  
              <TableCell>
              16th April to 15th May - Single Room
              </TableCell>  
              <TableCell>
              16th April to 15th May - Twin Sharing per person  
              </TableCell>  
              
          </TableCell>  
           
          </TableRow>

          <TableRow sx={{backgroundColor:"#FDDBC5"}}>
          <TableCell sx={{fontWeight:"bold"}}>2 nights and 3 days *Conference + 2 Workshops</TableCell>
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

          <TableRow sx={{backgroundColor:"#FEEBDF"}}>
          <TableCell sx={{fontWeight:"bold"}}>2 nights and 3 days **Conference only</TableCell>
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
          <TableRow sx={{backgroundColor:"#FDDBC5"}}>
          <TableCell sx={{fontWeight:"bold"}}>1 nights and 2 days **Conference only</TableCell>
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
        <TableRow sx={{backgroundColor:"#F48E5A"}}>
          <TableCell/>
          <TableCell sx={{textAlign:"center",color:"#fff",fontWeight:"bold"}}>Inclusive of GST for International Delegates in USD</TableCell>
          <TableCell/>
        </TableRow>
        <TableRow sx={{backgroundColor:"#FEEBDF"}}>
          <TableCell sx={{fontWeight:"bold"}}>3 nights and 4 days *International Delegates Conference + 2 Workshops</TableCell>
          <TableCell >
              <TableCell>
              750 USD  
              </TableCell>  
              <TableCell>
              550 USD  
              </TableCell>  
              <TableCell>
              800 USD
              </TableCell>  
              <TableCell>
              580 USD
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              800 USD 
              </TableCell>  
              <TableCell>
              600 USD
              </TableCell>  
              <TableCell>
              850 USD  
              </TableCell>  
              <TableCell>
              650 USD
              </TableCell>  
              
          </TableCell>  
          </TableRow>
          <TableRow sx={{backgroundColor:"#FDDBC5"}}>
          <TableCell sx={{fontWeight:"bold"}}>2 nights and 3 days *International Delegates Conference + 2 Workshops</TableCell>
          <TableCell >
              <TableCell>
              570 USD  
              </TableCell>  
              <TableCell>
              440 USD  
              </TableCell>  
              <TableCell>
              610 USD
              </TableCell>  
              <TableCell>
              480 USD
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              610 USD 
              </TableCell>  
              <TableCell>
              490 USD
              </TableCell>  
              <TableCell>
              660 USD  
              </TableCell>  
              <TableCell>
              540 USD
              </TableCell>  
              
          </TableCell>  
          </TableRow>
          <TableRow sx={{backgroundColor:"#FEEBDF"}}>
          <TableCell sx={{fontWeight:"bold"}}>2 nights and 3 days **International Delegates Conference only</TableCell>
          <TableCell >
              <TableCell>
              500 USD  
              </TableCell>  
              <TableCell>
              360 USD  
              </TableCell>  
              <TableCell>
              550 USD
              </TableCell>  
              <TableCell>
              410 USD
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              550 USD 
              </TableCell>  
              <TableCell>
              420 USD
              </TableCell>  
              <TableCell>
              600 USD  
              </TableCell>  
              <TableCell>
              470 USD
              </TableCell>  
              
          </TableCell>  
          </TableRow>
          <TableRow sx={{backgroundColor:"#FDDBC5"}}>
          <TableCell sx={{fontWeight:"bold"}}>1 nights and 2 days **International Delegates Conference only</TableCell>
          <TableCell >
              <TableCell>
              320 USD  
              </TableCell>  
              <TableCell>
              260 USD  
              </TableCell>  
              <TableCell>
              370 USD
              </TableCell>  
              <TableCell>
              310 USD
              </TableCell>  
              
          </TableCell>  
          <TableCell >
              <TableCell>
              370 USD 
              </TableCell>  
              <TableCell>
              310 USD
              </TableCell>  
              <TableCell>
              420 USD  
              </TableCell>  
              <TableCell>
              360 USD
              </TableCell>  
              
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
