import axios from 'axios';

export const axiosWithAuth = () => {
  return axios.create({
    headers: {
      Authorization: localStorage.getItem('token')
    },
    baseURL: 'http://localhost:5000/api'
  })
} 