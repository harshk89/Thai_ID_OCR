import React, { useState, useEffect } from 'react'
import { Typography, Container, Box, Button, Alert, AlertTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import ImageUploader from '../ImageUploader/ImageUploader';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCard, clearAll } from '../../actions/actions.js';
// import { useNavigate } from 'react-router-dom';


const UploadPage = () => {

  //selectedImage will store the image in base64 format
  const [selectedImage, setSelectedImage] = useState(null);

  // const [output, setOutput] = useState(null);
  const { card, isLoading, error } = useSelector((state) => state);

  useEffect(() => {
    return () => {
      handleClear();
    }
  }, [])
  

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if(selectedImage) {
      dispatch(uploadCard(selectedImage));
    }
  }

  const handleClear = () => {
    dispatch(clearAll());
    // setSelectedImage(null);
  }

  const styles = {
    text: {
      margin: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
  };

  return (
    <Container maxWidth="md">
      <Typography variant='h4' sx={{fontWeight: "600", fontFamily: "sans-serif", paddingTop: "50px", paddingBottom: "30px"}}>
        Upload
      </Typography>
      <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <div style={{display: "flex", justifyContent: 'center', paddingTop: "15px"}}>
        <div>
        <LoadingButton
          size="small"
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
          sx={{marginRight: "5px", width: "150px", padding: "10px"}}
        >
          <span>Submit</span>
        </LoadingButton>
        <Button onClick={handleClear} sx={{marginLeft: "5px", width: "150px", padding: "10px"}} variant="outlined">
          Clear
        </Button>
        </div>
      </div>
      { error!=="none" ? (
        <>
        <Typography>{error}</Typography>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Process was not completed!
      </Alert>
        </>
      ):(card!=null && !isLoading && (
          <Container sx={{padding: "10px",margin: "16px", border: '1px solid #ccc', borderRadius: '8px'}}>
            <Typography style={styles.text}>Identification Number: {card.id_num}</Typography>
            <Typography style={styles.text}>First Name: {card.first_name}</Typography>
            <Typography style={styles.text}>Last Name: {card.last_name}</Typography>
            <Typography style={styles.text}>Date of Birth: {card.dob}</Typography>
            <Typography style={styles.text}>Date of Issue: {card.doi}</Typography>
            <Typography style={styles.text}>Date of Expiry: {card.doe}</Typography>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              ID Card successfully stored!
            </Alert>
          </Container>
    ))}

      
      {/* {card!=null && !isLoading && (
        <Container sx={{padding: "10px",margin: "16px", border: '1px solid #ccc', borderRadius: '8px'}}>
          <Typography style={styles.text}>Identification Number: {card.id_num}</Typography>
          <Typography style={styles.text}>First Name: {card.first_name}</Typography>
          <Typography style={styles.text}>Last Name: {card.last_name}</Typography>
          <Typography style={styles.text}>Date of Birth: {card.dob}</Typography>
          <Typography style={styles.text}>Date of Issue: {card.doi}</Typography>
          <Typography style={styles.text}>Date of Expiry: {card.doe}</Typography>
        </Container>
      )} */}
    </Container>
  )
}

export default UploadPage