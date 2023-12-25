import React, { useState, useEffect } from 'react'
import { Typography, Container, TextField , Button, Alert, AlertTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll, deleteRecord } from '../../actions/actions.js';

import './DeletePage.css'

const DeletePage = () => {

    const [idNum, setIdNum] = useState("");

    const { isLoading, error } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
      return () => {
        handleClear();
      }
    }, [])

    const handleDelete = () => {
      if(idNum) {
        dispatch(deleteRecord(idNum));
      }
    };

    const handleClear = () => {
      setIdNum("");
      dispatch(clearAll());
    }

  return (
    <Container maxWidth="md">
      <Typography variant='h4' sx={{fontWeight: "600", fontFamily: "sans-serif", paddingTop: "50px", paddingBottom: "30px"}}>
        Delete
      </Typography>
      <Typography variant='body' sx={{fontWeight: "300", fontFamily: "sans-serif"}}>
        Delete a record with a particular identification number 
      </Typography>
      <TextField
        label="ID Number"
        helperText="Accepted format:- 0 0000 00000 00 0  (make sure spaces are at right place)"
        value={idNum}
        onChange={(e) => setIdNum(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2, marginTop: "10px" }}
      />
      <LoadingButton
        size="medium"
        onClick={handleDelete}
        loading={isLoading}
        loadingPosition="end"
        variant="contained"
        sx={{marginRight: "5px", width: "100px", padding: "5px"}}
      >
        <span>Delete</span>
      </LoadingButton>
      <Button onClick={handleClear} sx={{marginLeft: "5px", width: "100px"}} variant="outlined">
        Clear
      </Button>

      { error=="success" && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Record successfully updated!
        </Alert>
      )}

      { error!=="success" && error!=="none" && (
        <>
        <Typography>{error}</Typography>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Process was not completed!
        </Alert>
        </>
      )}
    </Container>
  )
}

export default DeletePage