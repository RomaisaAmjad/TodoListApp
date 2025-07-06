import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000' // this causes to send data 
});

export default API;
