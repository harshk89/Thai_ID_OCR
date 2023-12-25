import axios from 'axios';

const url = 'http://localhost:5000';

const API = axios.create({ baseURL: url });

export const uploadCard = (image) => API.post(`/`, image);