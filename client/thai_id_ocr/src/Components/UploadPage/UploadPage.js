import React from 'react'
import { Typography, Container } from '@mui/material';

import './UploadPage.css'

const UploadPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant='h4' sx={{fontWeight: "600", fontFamily: "sans-serif"}}>Upload</Typography>
    </Container>
  )
}

export default UploadPage