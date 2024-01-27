import axios from 'axios';
import { createCachedApi } from './createCachedApi';

const _api = axios.create({
    baseURL: process.env.VUE_APP_STREAKS_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export type Streak = {
    id: number;
    name: string;
    streak: number;
};

export type StreaksResponse = {
    login: {
        streaks: Streak[];
    } | { 
        error: string
    },
}

export const [StreaksApi, DropStreakCache] = createCachedApi({
    topStreaks: {
        handler: (streak_type: 'daily' | 'birthday') => _api.get<StreaksResponse['login']>(`/top_streaks?streak_type=${streak_type}`),
        duration: '1h',
    },
});
