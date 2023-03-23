import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const footerStyle = {
    backgroundColor: '#ac2642',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
    left: '0',
    bottom: '0',
    width: screenWidth-40,
    marginTop:"30vh"
  };

  return (
    <Box sx={footerStyle}>
      <Typography>Copyrights PCOS Society of India - All Rights Reserved 2018 </Typography>
    </Box>
  );
};

export default Footer;
