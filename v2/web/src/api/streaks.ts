import axios from 'axios';
import { createCachedApi } from './createCachedApi';
import { CapacitorApi } from './capacitorHttpWrapper';
import type { Api, ApiResponse } from './types';

const isMobile = process.env.VUE_APP_IS_MOBILE === 'true';

const _api = isMobile
    ? CapacitorApi(process.env.VUE_APP_STREAKS_URL, {
        'Content-Type': 'application/json',
        'X-Platform': 'mobile',
    }) as unknown as Api
    : axios.create({
        baseURL: process.env.VUE_APP_STREAKS_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'X-Platform': 'web',
        }
    }) as Api;

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
        handler: () => _api.get<StreaksResponse['checkIn']>('/check_in', {
            headers: {
                'X-USER-TIMEZONE': `${new Date().getTimezoneOffset()}`,
            }
        }),
        // Don't cache the response, because a user could check in moments before
        // their streak check-in lockout expires, and we want them to be able to
        // check in the moment their lockout expires.
        duration: '0s',
        after: (response: Awaited<ApiResponse<StreaksResponse['checkIn']>>) => {
            if (!('error' in response.data)) {

                // If a user successfully checks in, clear the cache & refetch
                // so that the subscribing leaderboard will have new data.
                DropStreakCache.topStreaks();
                StreaksApi.topStreaks('daily');
                StreaksApi.topStreaks('birthday');
            }
        } 
    }
});
