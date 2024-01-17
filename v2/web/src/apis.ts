import axios from 'axios';

export const AuthApi = axios.create({
    baseURL: process.env.VUE_APP_AUTH_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});
