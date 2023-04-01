import {
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TableCell,
    Stack,
    Typography,
    Paper,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import EachRowRateCard from "./EachRowRateCard";
  
  
  const ResidentialRateCardPhone = () => {
  
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <TableCell
                colSpan={9}
                style={{
                  backgroundColor: "#ef6223",
                  fontSize: 25,
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: "2px",
                  marginBottom: "0.2%",
                }}
              >
                Residential package
              </TableCell>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion  defaultExpanded sx={{backgroundColor:"#e6e1e1"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <TableCell
                    colSpan={9}
                    style={{
                      backgroundColor: "#ef6223",
                      fontSize: 25,
                      color: "#fff",
                      textAlign: "center",
                      borderRadius: "2px",
                      marginBottom: "0.2%",
                    }}
                  >
                    Domestic
                  </TableCell>
                </AccordionSummary>
                <AccordionDetails>
                    <Accordion defaultExpanded sx={{backgroundColor:"#f5c5b0"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     2 nights and 3 days *Conference + 2 Workshops
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#ef6223",type:"Non Member",c1:"39500+ 18% GST",c2:"30500 + 18% GST",c3:"40500 + 18% GST",c4:"31500 + 18% GST",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      <EachRowRateCard options={{theme:"#ef6223",type:"PCOS/ISAR/ASPIRE member",c1:"38500+ 18% GST",c2:"29500+ 18% GST",c3:"39500+ 18% GST",c4:"30500+ 18% GST",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      </Stack>
                      </AccordionDetails>
                    </Accordion >
                    <Accordion defaultExpanded sx={{backgroundColor:"#f5c5b0"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     2 nights and 3 days **Conference only
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#ef6223",type:"Non Member",c1:"39500+ 18% GST",c2:"30500+ 18% GST",c3:"35500+ 18% GST",c4:"26500+ 18% GST",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      <EachRowRateCard options={{theme:"#ef6223",type:"PCOS/ISAR/ASPIRE member",c1:"33500+ 18% GST",c2:"24500+ 18% GST",c3:"34500+ 18% GST",c4:"25500+ 18% GST",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      </Stack>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded sx={{backgroundColor:"#f5c5b0"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     1 nights and 2 days **Conference only
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#ef6223",type:"Non Member",c1:"22000 + 18% GST",c2:"17500 + 18% GST",c3:"23000 + 18% GST",c4:"18500 + 18% GST",accomodation1:" - Single room",accomodation2:" - Twin sharing room",}}/>
                      <EachRowRateCard options={{theme:"#ef6223",type:"PCOS/ISAR/ASPIRE member",c1:"21000 + 18% GST",c2:"16500 + 18% GST",c3:"22000 + 18% GST",c4:"17500 + 18% GST",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      </Stack>
          </AccordionDetails>
      </Accordion>
  </AccordionDetails>
  </Accordion>
  
  
  
              <Accordion defaultExpanded sx={{backgroundColor:"#e6e1e1"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <TableCell
                    colSpan={9}
                    style={{
                      backgroundColor: "#ef6223",
                      fontSize: 25,
                      color: "#fff",
                      textAlign: "center",
                      borderRadius: "2px",
                      marginBottom: "0.2%",
                    }}
                  >
                    International
                  </TableCell>
                </AccordionSummary>
                <AccordionDetails>
                <Accordion defaultExpanded sx={{backgroundColor:"#f5c5b0"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     3 nights and 4 days *International Delegates Conference + 2 Workshops
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#ef6223",type:"Non Member",c1:"800 USD",c2:"600 USD",c3:"850 USD",c4:"650 USD",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      <EachRowRateCard options={{theme:"#ef6223",type:"PCOS/ISAR/ASPIRE member",c1:"750 USD",c2:"550 USD",c3:"800 USD",c4:"580 USD",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      </Stack>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded sx={{backgroundColor:"#f5c5b0"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     2 nights and 3 days *International Delegates Conference + 2 Workshops
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#ef6223",type:"Non Member",c1:"610 USD",c2:"490 USD",c3:"660 USD",c4:"540 USD",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      <EachRowRateCard options={{theme:"#ef6223",type:"PCOS/ISAR/ASPIRE member",c1:"570 USD",c2:"440 USD",c3:"610 USD",c4:"480 USD",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      </Stack>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded sx={{backgroundColor:"#f5c5b0"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     2 nights and 3 days **International Delegates Conference only
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#ef6223",type:"Non Member",c1:"550 USD",c2:"420 USD",c3:"600 USD",c4:"470 USD",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      <EachRowRateCard options={{theme:"#ef6223",type:"PCOS/ISAR/ASPIRE member",c1:"500 USD",c2:"360 USD",c3:"550 USD",c4:"410 USD",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      </Stack>
          </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={{backgroundColor:"#f5c5b0"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     1 nights and 2 days **International Delegates Conference only
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#ef6223",type:"Non Member",c1:"370 USD",c2:"310 USD",c3:"420 USD",c4:"360 USD",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      <EachRowRateCard options={{theme:"#ef6223",type:"PCOS/ISAR/ASPIRE member",c1:"320 USD",c2:"260 USD",c3:"370 USD",c4:"310 USD",accomodation1:" - Single room",accomodation2:" - Twin sharing room"}}/>
                      </Stack>
          </AccordionDetails>
      </Accordion>
               </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Grid>
    
    <Grid item>
    <Paper sx={{padding:"5%"}}>
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
      </Paper>
        </Grid>
      </Grid>
    );
  };
  
  export default ResidentialRateCardPhone;
  