import {
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TableCell,
    Stack,
    Paper,
    Typography,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import EachRowRateCard from "./EachRowRateCard";
  
  
  const NonResidentialRateCardPhone = () => {
  
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <TableCell
                colSpan={9}
                style={{
                  backgroundColor: "#d84a5e",
                  fontSize: 25,
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: "2px",
                  marginBottom: "0.2%",
                }}
              >
                Non Residential package
              </TableCell>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion  defaultExpanded sx={{backgroundColor:"#e6e1e1"}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <TableCell
                    colSpan={9}
                    style={{
                      backgroundColor: "#d84a5e",
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
                    <Accordion defaultExpanded sx={{backgroundColor:"#d6b2b4"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          Conference + 2 workshops
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#d84a5e",type:"Non Member",c1:"14500 + 18% GST",c2:"15500 + 18% GST",c3:"16500 + 18% GST",c4:"18000 + 18% GST"}}/>
                      <EachRowRateCard options={{theme:"#d84a5e",type:"PCOS/ISAR/ASPIRE member",c1:"13500 + 18% GST",c2:"14500 + 18% GST",c3:"15500 + 18% GST",c4:"17000 + 18% GST"}}/>
                      </Stack>
                      </AccordionDetails>
                    </Accordion >
                    <Accordion defaultExpanded sx={{backgroundColor:"#d6b2b4"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          Conference only
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#d84a5e",type:"Non Member",c1:"9500 + 18% GST",c2:"10500 + 18% GST",c3:"11500 + 18% GST",c4:"13000 + 18% GST"}}/>
                      <EachRowRateCard options={{theme:"#d84a5e",type:"PCOS/ISAR/ASPIRE member",c1:"8500 + 18% GST",c2:"9500 + 18% GST",c3:"10500 + 18% GST",c4:"12000 + 18% GST"}}/>
                      </Stack>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded sx={{backgroundColor:"#d6b2b4"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     Post Graduate Students Conference + 2 Workshops
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#d84a5e",type:"Non Member",c1:"9000 + 18% GST",c2:"10000 + 18% GST",c3:"11000 + 18% GST",c4:"12500 + 18% GST"}}/>
                      <EachRowRateCard options={{theme:"#d84a5e",type:"PCOS/ISAR/ASPIRE member",c1:"8000 + 18% GST",c2:"9000 + 18% GST",c3:"10000 + 18% GST",c4:"11500 + 18% GST"}}/>
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
                      backgroundColor: "#d84a5e",
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
                <Accordion defaultExpanded sx={{backgroundColor:"#d6b2b4"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     *International Delegates Conference + 2 Workshops
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#d84a5e",type:"Non Member",c1:"225 USD",c2:"250 USD",c3:"275 USD",c4:"300 USD"}}/>
                      <EachRowRateCard options={{theme:"#d84a5e",type:"PCOS/ISAR/ASPIRE member",c1:"200 USD",c2:"225 USD",c3:"250 USD",c4:"275 USD"}}/>
                      </Stack>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded sx={{backgroundColor:"#d6b2b4"}}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                     *International Delegates Conference only
                      </AccordionSummary>
                      <AccordionDetails>
                      <Stack spacing={2}>
                      <EachRowRateCard  options={{theme:"#d84a5e",type:"Non Member",c1:"150 USD",c2:"175 USD",c3:"200 USD",c4:"225 USD"}}/>
                      <EachRowRateCard options={{theme:"#d84a5e",type:"PCOS/ISAR/ASPIRE member",c1:"125 USD",c2:"150 USD",c3:"175 USD",c4:"200 USD"}}/>
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
            <Typography sx={{marginTop:"5%",color:"#7D2D33",fontWeight:"bold"}}>* Conference + Workshop Registration Includes:</Typography>
            <Typography>Entry to any 2 Pre Congress Workshops ■ Conference registration and kit ■ 3 Lunches and 2 Dinners</Typography>
      
            <Typography sx={{marginTop:"5%",color:"#7D2D33",fontWeight:"bold"}}>** Conference only</Typography>
            <Typography>Conference registration and kit ■ 2 Lunches and 1 Dinner</Typography>
      
          <Typography sx={{marginTop:"5%",color:"#7D2D33",fontWeight:"bold"}}>*** Post-Graduate Students</Typography>
          <Typography>Entry to any 2 Pre Congress Workshops ■ Conference registration and kit ■ 3 Lunches </Typography>
      
        <Typography sx={{marginTop:"2%",color:"#7D2D33",fontWeight:"bold"}}>(Letter from HOD is essential to register as PG Student)</Typography>
    
            </Paper>
        </Grid>
      </Grid>
    );
  };
  
  export default NonResidentialRateCardPhone;
  