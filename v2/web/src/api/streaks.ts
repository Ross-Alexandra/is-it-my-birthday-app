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
    topStreaks: {
        streaks: Streak[];
    } | { 
        error: string
    },
    checkIn: {
        streak: number;
    } | {
        error: string;
    },
}

export const [StreaksApi, DropStreakCache] = createCachedApi({
    topStreaks: {
        handler: (streak_type: 'daily' | 'birthday') => _api.get<StreaksResponse['topStreaks']>(`/top_streaks?streak_type=${streak_type}`),
        duration: '1h',
    },
    checkIn: {
        handler: () => _api.get<StreaksResponse['checkIn']>('/check_in'),
        // Don't cache the response, because a user could check in moments before
        // their streak check-in lockout expires, and we want them to be able to
        // check in the moment their lockout expires.
        duration: '0s',
    }
});
