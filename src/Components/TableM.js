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
  
  const handlePaymentStatusFilterChange = (event) => {
    setPaymentStatusFilter(event.target.value);
  };

  const handleMembershipTypeFilterChange = (event) => {
    setMembershipTypeFilter(event.target.value);
  };
  

  const handlePackageTypeFilterChange = (event) => {
    setPackageTypeFilter(event.target.value);
  };
  
  
  
  
  
  useEffect(() => {
    axios.get("https://kisargo.ml/api/getAllUsers/")
    .then((result)=>{
      setData(result.data);
      console.log(result.data)
    })
  
    
  }, [])
  
  
  
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const handleFullDetailsClick = (rowData)=>{
          setSelectedRowData(rowData);
          setOpenDetailsModal(true);
    }
    
    const handleCloseDetailsModal = ()=>{
      setSelectedRowData(null);
      setOpenDetailsModal(false)
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
const handleSendMail =  ((rowData)=>{
  setSendMailRowData(rowData) 
})
useEffect(() => {
  console.log(sendMailRowData);
  window.open(`https://pcos-pay.vercel.app/paymentStatus/${sendMailRowData.transaction_id}`, '_blank')
}, [sendMailRowData])


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
    
    return true;
  });
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');
    XLSX.writeFile(workbook, 'table-data.xlsx');
  };

  return (
    <Paper elevation={5} sx={{padding:"5%",height:"100%",backgroundColor:"#c6ccca"}}>
    
    <TableContainer component={Paper} sx={{padding:"2%"}}>
      <Typography sx={{textAlign:"center",color:"#fff",backgroundColor:"#03a36e",marginBottom:"2%",height:"7vh",fontSize:35}}>Admin Panel</Typography>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <Toolbar sx={{marginRight:"30%"}}>
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
          <option value="all">All Accomodation Types</option>
          <option value="residential">Residential package</option>
          <option value="non_residential">Non residential package</option>
        </select>
        </Grid>
        <Grid item>
          
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
      </Select>
      </FormControl>
      <Stack sx={{marginLeft:"3%",textAlign:"center"}}>
        <Typography >Export</Typography>
        <VerticalAlignBottomIcon sx={{backgroundColor:"#03a36e",color:"#fff",borderRadius:"2rem",width:"75px",textAlign:"center",alignItems:"center"}} onClick={handleExport}/>
      </Stack>
      
      
      </div>
  <Table>
            <TableHead sx={{backgroundColor:"#03a36e",}}>
              <TableRow >
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Transaction Id</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Name</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Email</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Phone</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Membership Type</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Package Type</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Payment Status</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Edit Full Details</TableCell>
                <TableCell sx={{color:"#fff",fontWeight:"bold"}}>Send Email Receipt</TableCell>
              </TableRow>
            </TableHead>
   <TableBody>
    {filterData(filteredData,searchTerm,searchBy).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
      <>
      <TableRow key={row.transaction_id}>
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
              <PendingIcon sx={{color:"yellow"}}/>
              <Typography>Pending</Typography>
            </Stack>
              :
              <>N/A</>
            }
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton color="secondary" aria-label="edit">
            <EditIcon onClick={()=>handleFullDetailsClick(row)}/>
          </IconButton>
        </TableCell>
        <UserDetailsModal openModal={openDetailsModal} closeModal={handleCloseDetailsModal} data={selectedRowData} />
        
        <TableCell>
          <IconButton color="secondary" aria-label="edit">
            <ForwardToInboxIcon onClick={()=>handleSendMail(row)}/>
          </IconButton>
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