import React from 'react'
import { Typography, Grid, CssBaseline, Container } from '@mui/material';

import './Home.css';
import MyCard from '../MyCard/MyCard';

const Home = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant='h4' className="heading_1" sx={{fontWeight: "800", fontFamily: "sans-serif"}}>Welcome to Online THAI-ID Portal</Typography>

        <Grid container alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MyCard task="Upload" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MyCard task="Search" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MyCard task="Edit" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <MyCard task="Delete" />
            </Grid>
        </Grid>
        
      </Container>
    </React.Fragment>
  )
}

export default Home