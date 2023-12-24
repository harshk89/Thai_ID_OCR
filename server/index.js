import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use('/', routes);

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log("no connection", error.message));