import axios from 'axios';

const url = 'http://localhost:5000';

const API = axios.create({ baseURL: url });

export const uploadCard = (image) => API.post(`/`, image);
export const search = (searchQuery) => API.get(`/searchRecords?idNum=${searchQuery.idNum || 'none'}&fName=${searchQuery.fName || 'none'}&lName=${searchQuery.lName || 'none'}&dob=${searchQuery.dob || 'none'}&searchType=${searchQuery.searchType || 'none'}`, searchQuery);
export const editRecord = (data) => API.patch('/editRecord', data);