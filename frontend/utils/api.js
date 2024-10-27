import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const api = {
  login: (username) => 
    axios.post(`${API_BASE_URL}/api/login`, { username }),
  
  getComments: () => 
    axios.get(`${API_BASE_URL}/api/comments`),
  
  postComment: (username, comment) => 
    axios.post(`${API_BASE_URL}/api/comments`, { username, comment })
};