import axios from 'axios';
import { createCachedApi } from './createCachedApi';
import { CapacitorApi } from './capacitorHttpWrapper';

const isMobile = process.env.VUE_APP_IS_MOBILE === 'true';

const webApi = axios.create({
    baseURL: process.env.VUE_APP_STREAKS_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

const mobileApi = CapacitorApi(process.env.VUE_APP_STREAKS_URL, {
    'Content-Type': 'application/json',
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
        handler: (streak_type: 'daily' | 'birthday') => !isMobile
            ? webApi.get<StreaksResponse['topStreaks']>(`/top_streaks?streak_type=${streak_type}`)
            : mobileApi.get<StreaksResponse['topStreaks']>('/top_streaks', { streak_type }),
        duration: '1h',
    },
    checkIn: {
        handler: () => !isMobile 
            ? webApi.get<StreaksResponse['checkIn']>('/check_in', {
                headers: {
                    'X-USER-TIMEZONE': new Date().getTimezoneOffset(),
                }
            })
            : mobileApi.get<StreaksResponse['checkIn']>('/check_in', undefined, {
                'X-USER-TIMEZONE': `${new Date().getTimezoneOffset()}`,
            }),
        // Don't cache the response, because a user could check in moments before
        // their streak check-in lockout expires, and we want them to be able to
        // check in the moment their lockout expires.
        duration: '0s',
    }
});
