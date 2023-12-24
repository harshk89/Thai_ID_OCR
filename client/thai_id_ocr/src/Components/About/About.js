import React from 'react'
import { Typography, Container } from '@mui/material';

import './About.css'

const About = () => {
  return (
    <Container maxWidth="md">
      <Typography variant='h4' sx={{fontWeight: "600", fontFamily: "sans-serif"}}>About</Typography>
    </Container>
  )
}

export default About