import axios from 'axios';
import { createCachedApi } from './createCachedApi';
import { CapacitorApi } from './capacitorHttpWrapper';
import type { Api } from './types';

const isMobile = process.env.VUE_APP_IS_MOBILE === 'true';

const _api = isMobile
    ? CapacitorApi(process.env.VUE_APP_AUTH_URL, {
        'Content-Type': 'application/json',
        'X-Platform': 'mobile',
    }) as unknown as Api
    : axios.create({
        baseURL: process.env.VUE_APP_AUTH_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Platform': 'web',
        }
    }) as Api;

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
        handler: (email: string) => _api.post<AuthResponses['login']>('/login', { email }),
        duration: '30s', // There's no reason a user should be logging in more than once every 30 seconds.
    },
    logout: {
        handler: () => _api.get<AuthResponses['logout']>('/logout'),
        duration: '0s',
        after: () => DropAuthCache.me(), // After logging out, the user's data will have changed.
    },
    me: {
        handler: () => _api.get<AuthResponses['me']>('/me'),
        duration: '5m',
    },
    register: {
        handler: (data: RegisterData) => _api.post<AuthResponses['register']>('/register', data),
        duration: '30s',
    },
    verifyEmail: {
        handler: (token: string) => _api.get<AuthResponses['verifyEmail']>(`/verify?v=${token}`),
        duration: '0s',
        after: () => DropAuthCache.me(), // After verifying an email, the user's data will have changed.
    },
});
