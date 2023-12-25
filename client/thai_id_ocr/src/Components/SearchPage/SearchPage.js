import React, { useState, useEffect } from 'react'
import { Typography, Container, TextField, Select, MenuItem, Button, Alert, AlertTitle, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAll } from '../../actions/actions.js';

import './SearchPage.css'

const SearchPage = () => {

  const { cards, isLoading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      handleClear();
    }
  }, [])

  const [searchType, setSearchType] = useState("idNum");
  const [idNum, setIdNum] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [dob, setDob] = useState("");

  const handleSearch = () => {
    const searchQuery = {
      idNum: idNum,
      fName: fName,
      lName: lName,
      dob: dob,
      searchType: searchType
    }
    dispatch(search(searchQuery));
  }

  const handleClear = () => {
    setIdNum("");
    setDob("");
    setFName("");
    setLName("");
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
        Search
      </Typography>
      <div>
      <Select
        label="Search By"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="idNum">ID Number</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="dob">Date of Birth</MenuItem>
      </Select>

      {searchType==='idNum' && (<TextField
        label="Enter Id Number"
        helperText="Accepted format:- 0 0000 00000 00 0  (make sure spaces are at right place)"
        value={idNum}
        onChange={(e) => setIdNum(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />)}
      {searchType==='name' && (<><TextField
        label="Enter First Name"
        value={fName}
        onChange={(e) => setFName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      /><TextField
      label="Enter Last Name"
      value={lName}
      onChange={(e) => setLName(e.target.value)}
      fullWidth
      sx={{ marginBottom: 2 }}
    />
      </>)}
      {searchType==='dob' && (<TextField
        label="Enter DOB"
        helperText="Accepted format example: 25 Jan. 2020 , 15 Dec. 2015"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />)}

      <LoadingButton
          size="medium"
          onClick={handleSearch}
          endIcon={<SearchIcon />}
          loading={isLoading}
          loadingPosition="end"
          variant="contained"
          sx={{marginRight: "5px", width: "150px", padding: "10px"}}
        >
          <span>Search</span>
        </LoadingButton>
        <Button onClick={handleClear} sx={{marginLeft: "5px", width: "150px", padding: "10px"}} variant="outlined">
          Clear
        </Button>
    </div>

    { error!=="none" ? (
        <>
        <Typography>{error}</Typography>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Process was not completed!
        </Alert>
        </>
      ):(cards.length>0 && !isLoading && (
          <Container sx={{padding: "10px",marginTop: "16px", border: '1px solid #ccc', borderRadius: '8px'}}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
                {cards.length} record(s) found.
            </Alert>
            <Grid container alignItems='stretch' spacing={4}>
              {cards.map((card) => (
                <Grid key={card._id} item xs={12} sm={12} md={6} lg={6}>
                  <Typography style={styles.text}>Identification Number: {card.id_num}</Typography>
                  <Typography style={styles.text}>First Name: {card.first_name}</Typography>
                  <Typography style={styles.text}>Last Name: {card.last_name}</Typography>
                  <Typography style={styles.text}>Date of Birth: {card.dob}</Typography>
                  <Typography style={styles.text}>Date of Issue: {card.doi}</Typography>
                  <Typography style={styles.text}>Date of Expiry: {card.doe}</Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
    ))}
    </Container>
  )
}

export default SearchPage