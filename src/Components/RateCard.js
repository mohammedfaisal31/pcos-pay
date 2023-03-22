import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export default function Ratecard() {
  const [selection ,setSelection] = useState(1);
  const handleSeletionChange = (e)=>{
    setSelection(e.target.value);
  }
  const imgstyle = {
    marginTop:"2%",
    height:window.innerHeight-250,
    width:window.innerHeight-10 ,
    position:"relative"
  }
  return (
    <>
      <FormControl fullWidth >
              <InputLabel id="salutation">Select package to view</InputLabel>
             <Select
               id="selection"
                value={selection}
                label="Select package to view"
                name="selection"
                required
                onChange={handleSeletionChange}
             >
                <MenuItem value={1}>Non residential packages</MenuItem>
                <MenuItem value={2}>Residential packages</MenuItem>
                
             </Select>
          </FormControl>
    
        
        {selection === 1 ? <img style={imgstyle} alt="1" src="/asset/1.png" /> : <img style={imgstyle} alt="2" src="/asset/2.png" />}

    </>
  )
}
