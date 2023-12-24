import React from 'react'
import { Typography, Container } from '@mui/material';

import './SearchPage.css'

const SearchPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant='h4' sx={{fontWeight: "600", fontFamily: "sans-serif"}}>Search</Typography>
    </Container>
  )
}

export default SearchPage