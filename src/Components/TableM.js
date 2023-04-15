import React, { useEffect, useState,useCallback  } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton,Toolbar, Select, MenuItem, Modal, Box, Typography, Stack, TablePagination, FormControl, InputLabel, Grid } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, FilterList as FilterIcon } from '@mui/icons-material';
import axios from 'axios';
import DetailsIcon from '@mui/icons-material/Details';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import UserDetailsModal from './UserDetailsModal';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PendingIcon from '@mui/icons-material/Pending';
import { FilterList } from '@mui/icons-material';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import * as XLSX from 'xlsx';
import AddIcon from '@mui/icons-material/Add';
import AddEntryModal from './AddEntryModal';


const styles = `
  .MuiTableCell-root {
    border: 1px solid black;
  }
`;
const TableM = () => {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(styles));
  document.head.appendChild(style);
  
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [membershipTypeFilter, setMembershipTypeFilter] = useState('all');
  const [packageTypeFilter, setPackageTypeFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  
  const handlePaymentStatusFilterChange = (event) => {
    setPaymentStatusFilter(event.target.value);
  };

  const handleMembershipTypeFilterChange = (event) => {
    setMembershipTypeFilter(event.target.value);
  };
  

  const handlePackageTypeFilterChange = (event) => {
    setPackageTypeFilter(event.target.value);
  };
  
  const handlePaymentMethodFilter = (event) => {
    setPaymentMethodFilter(event.target.value);
  };
  
  
  
  
  useEffect(() => {
    axios.get("https://kisargo.ml/api/getAllUsers/")
    .then((result)=>{
      setData(result.data);
      console.log(result.data)
    })
  
    
  }, [])
  
  function zeroPad(num, length) {
    return num.toString().padStart(length, '0');
  }
  
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [openAddEntryModal, setOpenAddEntryModal] = useState(false);
    const handleFullDetailsClick = (rowData)=>{
          setSelectedRowData(rowData);
          setOpenDetailsModal(true);
    }
    
    const handleCloseDetailsModal = ()=>{
      setSelectedRowData(null);
      setOpenDetailsModal(false)
    }
    const handleCloseAddEntryModal = ()=>{
      setOpenAddEntryModal(false)
    }
    const handleOpenAddEntryModal = ()=>{
      setOpenAddEntryModal(true)
    }
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("user_name");
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
    
      const filterData = (data, searchTerm,searchBy) => {
        if (!searchTerm) return data;
      
         return data.filter((row) =>
            row[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
            
          )
         
      };
  
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSearchByChange = (event) =>{
    setSearchBy(event.target.value);
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRowData, setSelectedRowData] = useState(null);
  

const [sendMailRowData, setSendMailRowData] = useState({});
const [sendMailRowDataCount, setSendMailRowDataCount] = useState(0);

const handleSendMail =  ((rowData)=>{
  setSendMailRowData(rowData)
  setSendMailRowDataCount(sendMailRowDataCount+1); 
})
useEffect(() => {
  console.log(sendMailRowData);
  window.open(`https://pcos-pay.vercel.app/paymentStatus/${sendMailRowData.transaction_id}`, '_blank')
}, [sendMailRowData,sendMailRowDataCount])


  const filteredData = data.filter((row) => {
    if (paymentStatusFilter !== 'all' && row.paymentStatus !== paymentStatusFilter) {
      return false;
    }
    if (membershipTypeFilter !== 'all' && row.member_type !== membershipTypeFilter) {
      return false;
    }
    if (packageTypeFilter !== 'all' && row.package_type !== packageTypeFilter) {
      return false;
    }
    if (paymentMethodFilter !== 'all' && row.payment_method !== paymentMethodFilter) {
      return false;
    }
    return true;
  });
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(formattedData(filterData(filteredData,searchTerm,searchBy),columnMapping));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table-data.xlsx');
  };

  const columnMapping = {
    "accomodation_type": "Accomodation Type",
    "amount": "Amount",
    "conference_type": "Conference Type",
    "date_of_transaction": "Date Of Transaction",
    "member_type": "Member Type",
    "package_type": "Package Type",
    "paymentID": "Payment ID",
    "paymentStatus": "Payment Status",
    "payment_purpose": "Payment Purpose",
    "time_of_transaction": "Time Of Transaction",
    "transaction_id": "Transaction Id",
    "user_address": "Address",
    "user_age": "Age",
    "user_city": "City",
    "user_designation": "Designation",
    "user_diet": "Diet",
    "user_email": "Email",
    "user_institution": "Institution",
    "user_medical_council_number": "Medical Council Number",
    "user_membership_number": "Membership Number",
    "user_name": "Name",
    "user_phone": "Phone",
    "user_pincode": "Pincode",
    "user_salutation": "Salutation",
    "user_sex": "Sex",
    "user_state": "State",
    "workshop_titles": "Workshop Titles"
  }
  
  const formattedData = (data,columnMapping)=>{
    if (!Array.isArray(data) || !data.length) {
      return [];
    }
  
    return data.map(row => {
      const newRow = {};
      row["conference_type"] = row["payment_purpose"].replace("Opted for ","")
      let workshop_titles =  JSON.parse(row["workshop_titles"])
      //console.log(workshop_titles)
      for(let i=0;i<workshop_titles.length;i++){
        console.log(workshop_titles[i])
        if(workshop_titles[i] === "check1") workshop_titles[i] = "Insulin Resistance in PCOS"
        else if(workshop_titles[i] === "check2") workshop_titles[i] = "Embryo Biopsy and PGT"
        else if(workshop_titles[i] === "check3") workshop_titles[i] = "Body Image and PCOS"
        else if(workshop_titles[i] === "check4") workshop_titles[i] = "Ultrasound in PCOS"
        else if(workshop_titles[i] === "check5") workshop_titles[i] = "Vitrification of Oocytes and Embryos"
        else if(workshop_titles[i] === "check6") workshop_titles[i] = "Errors in ART"
        else continue
        
      }
      //console.log(JSON.stringify(workshop_titles))
      row["workshop_titles"] = JSON.stringify(workshop_titles);
      for (const key in row) {
        newRow[columnMapping[key]] = row[key];
        
      }
      return newRow;
    });
      
    
  }

  return (
    <Paper elevation={5} sx={{padding:"5%",height:"100%",backgroundColor:"#c6ccca"}}>
    
    <TableContainer component={Paper} sx={{padding:"2%"}}>
      <Typography sx={{textAlign:"center",color:"#fff",backgroundColor:"#03a36e",marginBottom:"2%",height:"7vh",fontSize:35}}>Admin Panel</Typography>
      <IconButton
      size="large"
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: '3rem',
          border:" 2px #03a36e solid",
          marginRight:"1%"
        },
      }}
      onClick={handleOpenAddEntryModal}
    >
      <AddIcon />
      <Typography> Add an Entry</Typography>
    </IconButton>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <Toolbar sx={{marginRight:"8%"}}>
        <FilterList />
        <Grid container spacing={2}>
         <Grid item>
        <select value={paymentStatusFilter} onChange={handlePaymentStatusFilterChange}>
          <option value="all">All Payment Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
        </Grid>
        <Grid item>
        <select value={membershipTypeFilter} onChange={handleMembershipTypeFilterChange}>
          <option value="all">All Membership Types</option>
          <option value="member">Member</option>
          <option value="non_member">Non-member</option>
        </select>
        </Grid>
        <Grid item>
        <select value={packageTypeFilter} onChange={handlePackageTypeFilterChange}>
          <option value="all">All Package Types</option>
          <option value="residential">Residential package</option>
          <option value="non_residential">Non residential package</option>
        </select>
        </Grid>
        <Grid item>
        <select value={paymentMethodFilter} onChange={handlePaymentMethodFilter}>
          <option value="all">All Payment Methods</option>
          <option value="online">Online payments</option>
          <option value="RTGS/NEFT/Cheque/DD">RTGS/NEFT/Cheque/DD payments</option>
        </select>
        </Grid>
        </Grid>
      </Toolbar>

      
        <TextField
          variant="standard"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{ startAdornment: <FilterIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} 
          /> }}
          sx = {{marginRight:"2%"}}
        />
        <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-label">Search By</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={searchBy}
        onChange={handleSearchByChange}
        label="Search By"
        sx={{color:"black"}}
      >
        {/* Define your options here. Example: */}
        <MenuItem value="user_name">Name</MenuItem>
        <MenuItem value="user_phone">Phone</MenuItem>
        <MenuItem value="user_email">Email</MenuItem>
        <MenuItem value="transaction_id">Transaction ID</MenuItem>
        <MenuItem value="unique_id">Registration Number</MenuItem>
      </Select>
      </FormControl>
      <Stack sx={{marginLeft:"5%",textAlign:"center"}}>
        <Typography >Export</Typography>
        <VerticalAlignBottomIcon sx={{backgroundColor:"#03a36e",color:"#fff",borderRadius:"2rem",width:"75px",textAlign:"center",alignItems:"center"}} onClick={handleExport}/>
      </Stack> 
      
      
      </div>
  <Table>
            <TableHead sx={{backgroundColor:"#03a36e",}}>
              <TableRow >
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Registration Number</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Transaction Id</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Name</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Email</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Phone</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Membership Type</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Package Type</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Payment Status</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Payment Method</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Edit Full Details</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Send Email Receipt</TableCell>
              </TableRow>
            </TableHead>
   <TableBody>
    {filterData(filteredData,searchTerm,searchBy).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
      <>
      <TableRow key={row.transaction_id}>
      <TableCell>{row.unique_id = zeroPad(row.unique_id,4) }</TableCell>
        <TableCell>{row.transaction_id}</TableCell>
        <TableCell>{row.user_name}</TableCell>
        <TableCell>{row.user_email}</TableCell>
        <TableCell>{row.user_phone}</TableCell>
        <TableCell>{row.member_type === "member" ? "Member" : "Non Member"}</TableCell>
        <TableCell>{row.package_type === "residential" ? "Residential" : "Non Residential"}</TableCell>
        <TableCell>
        <IconButton color="primary" aria-label="edit">
            {
            row.paymentStatus === "success" ? 
                <Stack>
                  <CheckIcon sx={{color:"green"}}/>
                  <Typography>Success</Typography>
                </Stack> : 
              row.paymentStatus === "failed" ?
              <Stack>
              <ClearIcon sx={{color:"red"}}/>
              <Typography>Failed</Typography>
            </Stack>
                
                
              :
              row.paymentStatus === "pending" ?
              
              <Stack>
              <PendingIcon sx={{color:"orange"}}/>
              <Typography>Pending</Typography>
             </Stack>
              :
              <Stack>
              <PendingIcon sx={{color:"orange"}}/>
              <Typography>Pending</Typography>
             </Stack>
            }
          </IconButton>
        </TableCell>
        <TableCell>{row.payment_method}</TableCell>
        <TableCell>
          <IconButton color="secondary" aria-label="edit">
            <EditIcon onClick={()=>handleFullDetailsClick(row)}/>
          </IconButton>
        </TableCell>
        <UserDetailsModal openModal={openDetailsModal} closeModal={handleCloseDetailsModal} data={selectedRowData} />
        <AddEntryModal openModal={openAddEntryModal} closeModal={handleCloseAddEntryModal} />
        
        
        <TableCell>
          {
            row.paymentStatus === "success" ?
            <IconButton color="secondary" aria-label="edit">
              <ForwardToInboxIcon onClick={()=>handleSendMail(row)}/>
            </IconButton> :
            <IconButton sx={{color:"grey"}} aria-label="edit">
              <ForwardToInboxIcon />
            </IconButton> 
          
          }
          
        </TableCell>
        
        
      </TableRow>
      </>
    ))}
  </TableBody>
</Table>
<TablePagination
      component="div"
      count={data.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
</TableContainer>
</Paper>

);
}

export default TableM;