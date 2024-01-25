import axios from 'axios';
import { cachedRoutes } from './cachedRoutes';

const _api = axios.create({
    baseURL: process.env.VUE_APP_AUTH_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export type RegisterData = {
    name: string,
    email: string,
    birth_day: number,
    birth_month: number,
};

export type AuthResponses = {
    login: { error: string} | { success: true },
    logout: { success: true },
    me: { error: string} | {
        id: number,
        name: string,
        birthday: `${number}-${number}`
    },
    register: { error: string} | { success: true },
    verifyEmail: { error: string} | { success: true },
}

export const AuthApi = cachedRoutes({
    login: {
        handler: (email: string) => _api.post<AuthResponses['login']>('/login', { email }),
        duration: '0s',
    },
    logout: {
        handler: () => _api.get<AuthResponses['logout']>('/logout'),
        duration: '0s',
    },
    me: {
        handler: () => _api.get('/me'),
        duration: '5m',
    },
    register: {
        handler: (data: RegisterData) => _api.post('/register', data),
        duration: '30s',
    }, 
    verifyEmail: {
        handler: (token: string) => _api.get(`/verify?v=${token}`),
        duration: '0s',
    },
});
