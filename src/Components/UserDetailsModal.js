import { Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  
const modal_box_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 14,
    p: 4,
  };
export default function UserDetailsModal(props) {
    
    
    const[paymentStatus,setPaymentStatus] = useState("N/A")
    const handleCloseDetailsModal = ()=>{
      props.closeModal(false)
    }
    const handlepaymentStatusChange = (e)=>{
        setPaymentStatus(e.target.value)
    }
    return (
    <Modal
          open={props.openModal}
          onClose={handleCloseDetailsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        > 
        <Box sx={modal_box_style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            
        </Typography>
            </Box>
        </Modal>
        
  )
}
