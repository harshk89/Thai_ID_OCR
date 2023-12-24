import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import './MyCard.css';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );


const MyCard = (props) => {
    const { task } = props;
    const navigate = useNavigate();

    const HandleClick = () => {
        navigate(`/`);
    }

    return (
        <Card onClick={HandleClick} className="card_link" sx={{ minWidth: 275, background: "rgb(246, 251, 255)" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                {task}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MyCard