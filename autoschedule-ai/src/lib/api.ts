import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // The address of our FastAPI backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;