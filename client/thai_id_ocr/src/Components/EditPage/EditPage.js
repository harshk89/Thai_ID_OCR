import React from 'react'
import { Typography, Container } from '@mui/material';

import './EditPage.css'

const EditPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant='h4' sx={{fontWeight: "600", fontFamily: "sans-serif"}}>Edit</Typography>
    </Container>
  )
}

export default EditPage