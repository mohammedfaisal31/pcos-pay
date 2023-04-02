import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function EachRowRateCard(props) {
  return (
    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                
                        <TableCell
                          colspan={4}
                          sx={{
                            border: "1px solid black",
                            textAlign: "center",
                            color: "#fff",
                            borderLeft: "3px solid #9d3d44",
                            fontWeight: "bold",
                            backgroundColor:props.options.theme
                          }}
                        >
                          {props.options.type}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                          <TableBody>
                          <TableRow sx={{backgroundColor:"#E9DDDA"}}>
                          <TableCell sx={{color:"#585656",fontWeight:"bold",border:" 1px solid black",borderLeft:"1px solid black" }}>
                            {props.options.accomodation1}
                         </TableCell>  
                        <TableCell sx={{color:"#585656",fontWeight:"bold",border:" 1px solid black"}}>
                            {props.options.accomodation2}
                        </TableCell >  
                        <TableCell sx={{color:"#585656",fontWeight:"bold",border:" 1px solid black"}}>
                            {props.options.accomodation3}
                         </TableCell>  
                        <TableCell sx={{color:"#585656",fontWeight:"bold",width:"11.25",border: '1px solid black'}}>
                            {props.options.accomodation4}
                        </TableCell>  
                        </TableRow>
                        <TableRow sx={{backgroundColor:"#DAC4BF"}}>
                        <TableCell sx={{ border: '1px solid black'  ,borderLeft:"1px solid black"  }}>
                            {props.options.c1} 
                            </TableCell>  
                            <TableCell sx={{ border: '1px solid black', }}>
                            {props.options.c2}  
                            </TableCell>  
                            <TableCell sx={{ border: '1px solid black' }}>
                            {props.options.c3} 
                            </TableCell>  
                            <TableCell sx={{ border: '1px solid black', }}>
                            {props.options.c4} 
                            </TableCell>  
                        </TableRow>
                          </TableBody>
                </Table>
            </TableContainer>
  )
}
