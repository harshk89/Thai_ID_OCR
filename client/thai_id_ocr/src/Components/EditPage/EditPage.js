import React, { useState, useEffect } from 'react'
import { Typography, Container, TextField, Button, Alert, AlertTitle, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll, editRecord } from '../../actions/actions.js';

import './EditPage.css'

const EditPage = () => {

  const { card, isLoading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      handleClear();
    }
  }, [])

  const [formData, setFormData] = useState({
    idNum: '',
    fname: '',
    lname: '',
    dateOfBirth: '',
    dateOfIssue: '',
    dateOfExpiry: '',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editRecord({ ...formData }));
  };

  const handleClear = () => {
    setFormData({
      idNum: '',
      fname: '',
      lname: '',
      dateOfBirth: '',
      dateOfIssue: '',
      dateOfExpiry: '',
    });
    dispatch(clearAll());
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
        Edit
      </Typography>
      <Typography variant='body' sx={{fontWeight: "300", fontFamily: "sans-serif"}}>
        Edit a record with a particular identification number 
      </Typography>
      <div style={{marginTop: "10px"}}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID Number"
            helperText="Accepted format:- 0 0000 00000 00 0  (make sure spaces are at right place)"
            value={formData.idNum}
            onChange={handleChange('idNum')}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="First Name"
            value={formData.fname}
            onChange={handleChange('fname')}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Last Name"
            value={formData.lname}
            onChange={handleChange('lname')}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Date of Birth"
            helperText="Accepted format example: 25 Jan. 2020 , 15 Dec. 2015"
            value={formData.dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Date of Issue"
            helperText="Accepted format example: 25 Jan. 2020 , 15 Dec. 2015"
            value={formData.dateOfIssue}
            onChange={handleChange('dateOfIssue')}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Date of Expiry"
            helperText="Accepted format example: 25 Jan. 2020 , 15 Dec. 2015"
            value={formData.dateOfExpiry}
            onChange={handleChange('dateOfExpiry')}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />

        <LoadingButton
          type="submit"
          size="medium"
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
          sx={{marginRight: "5px", width: "150px", padding: "10px"}}
        >
          <span>Submit</span>
        </LoadingButton>
          <Button onClick={handleClear} sx={{marginLeft: "5px", width: "100px"}} variant="outlined">
            Clear
          </Button>
        </form>

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
            Record successfully updated!
          </Alert>
        </Container>
    ))}
    </div>
    </Container>
  );
}

export default EditPage