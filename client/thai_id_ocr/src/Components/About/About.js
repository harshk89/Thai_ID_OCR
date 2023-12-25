import React from 'react'
import { Typography, Container } from '@mui/material';

import './About.css'

const About = () => {
  return (
    <Container maxWidth="md">
      <Typography variant='h2' sx={{fontWeight: "600", fontFamily: "sans-serif", paddingTop: "50px", paddingBottom: "30px"}}>
        About
      </Typography>
      <Typography variant='h3' sx={{fontWeight: "300", fontFamily: "sans-serif", marginTop: "20px"}}>
        THAI ID OCR APP
      </Typography>
      <Typography variant='h5' sx={{fontWeight: "300", fontFamily: "sans-serif", marginTop: "10px"}}>
        This Assignment is created for Qoala Placement Drive<br />
        Created By: Harsh Kesarwani<br />
        Roll Number: 20UCC046<br/>
        College: The LNM Institute of Information Technology, Jaipur (LNMIIT)
      </Typography>
    </Container>
  )
}

export default About