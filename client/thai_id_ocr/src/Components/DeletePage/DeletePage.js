import React from 'react'
import { Typography, Container } from '@mui/material';

import './DeletePage.css'

const DeletePage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant='h4' sx={{fontWeight: "600", fontFamily: "sans-serif"}}>Delete</Typography>
    </Container>
  )
}

export default DeletePage