import axios from 'axios';

export const axiosInstanceUsermanagement = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    }
});

