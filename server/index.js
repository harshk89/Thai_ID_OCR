import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes/routes.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json({limit:  "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:  "30mb", extended: true}));
app.use(cors());

app.use('/', routes);

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log("no connection", error.message));

