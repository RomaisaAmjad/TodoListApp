import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000' // this causes to send data 
});

export default API;
