import React, { useState } from 'react'
import { Typography, Container, Box, Button } from '@mui/material';
import ImageUploader from '../ImageUploader/ImageUploader';


const UploadPage = () => {

  //selectedImage will store the image in base64 format
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Container maxWidth="md">
      <Typography variant='h4' sx={{fontWeight: "600", fontFamily: "sans-serif", paddingTop: "50px", paddingBottom: "30px"}}>
        Upload
      </Typography>
      <ImageUploader setSelectedImage={setSelectedImage} />
      <div style={{display: "flex"}}>
        <Button sx={{margin: "auto", width: "150px", padding: "10px", marginTop: "15px"}} variant="contained" component="span">
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default UploadPage