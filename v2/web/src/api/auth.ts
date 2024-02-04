import axios from 'axios';
import { createCachedApi } from './createCachedApi';
import { CapacitorApi } from './capacitorHttpWrapper';

const isMobile = process.env.VUE_APP_IS_MOBILE === 'true';

const webApi = axios.create({
    baseURL: process.env.VUE_APP_AUTH_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

const mobileApi = CapacitorApi(process.env.VUE_APP_AUTH_URL, {
    'Content-Type': 'application/json',
});

export type RegisterData = {
    name: string,
    email: string,
    birth_day: number,
    birth_month: number,
};

export type User = {
    id: number,
    name: string,
    birthday: `${number}-${number}`
};

export type AuthResponses = {
    login: { error: string} | { success: true },
    logout: { success: true },
    me: { error: string} | User,
    register: { error: string} | { success: true },
    verifyEmail: { error: string} | { success: true },
}

export const [AuthApi, DropAuthCache] = createCachedApi({
    login: {
        handler: (email: string) => !isMobile
            ? webApi.post<AuthResponses['login']>('/login', { email })
            : mobileApi.post<AuthResponses['login']>('/login', { email }),
        duration: '30s', // There's no reason a user should be logging in more than once every 30 seconds.
    },
    logout: {
        handler: () => !isMobile 
            ? webApi.get<AuthResponses['logout']>('/logout')
            : mobileApi.get<AuthResponses['logout']>('/logout'),
        duration: '0s',
        after: () => DropAuthCache.me(), // After logging out, the user's data will have changed.
    },
    me: {
        handler: () => !isMobile 
            ? webApi.get<AuthResponses['me']>('/me')
            : mobileApi.get<AuthResponses['me']>('/me'),
        duration: '5m',
    },
    register: {
        handler: (data: RegisterData) => !isMobile
            ? webApi.post<AuthResponses['register']>('/register', data)
            : mobileApi.post<AuthResponses['register']>('/register', data),
        duration: '30s',
    },
    verifyEmail: {
        handler: (token: string) => !isMobile
            ? webApi.get<AuthResponses['verifyEmail']>(`/verify?v=${token}`)
            : mobileApi.get<AuthResponses['verifyEmail']>('/verify', { v: token}),
        duration: '0s',
        after: () => DropAuthCache.me(), // After verifying an email, the user's data will have changed.
    },
});
