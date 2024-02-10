import { defineStore } from 'pinia'
import moment from 'moment';
import type { unitOfTime } from 'moment';

export type CacheDuration = `${number}${unitOfTime.DurationConstructor}`;
export type CacheEntry = {
    expires: string,
    data: any,
}

export const useApiCache = defineStore('apiCache', {
    state: () => ({
        cache: {} as Record<string, CacheEntry>,
    }),
    actions: {
        getCache(key: string): any | null {
            const cacheHit = this.cache[key];
            if (!cacheHit) {
                return null;
            }

            const now = new Date();
            const expires = new Date(cacheHit.expires);
            if (expires < now) {
                this.dropCache(key);
                return null;
            }

            return cacheHit.data;
        },
        setCache(key: string, value: any, cacheDuration: CacheDuration) {
            // Since a DurationConstructor is a string, and the unit is a number,
            // we can safely split the string into a tuple of [number, string]
            // and then cast the second element to the type we need.
            const [, duration, unit] = cacheDuration.split(/(\d+)/) as [never, number, unitOfTime.DurationConstructor];

            this.cache[key] = {
                expires: moment().add(duration, unit).toISOString(),
                data: value,
            };
        },
        dropCache(key: string) {
            delete this.cache[key];
        },
        dropSubCache(subKey: string) {
            Object.keys(this.cache).forEach((key) => {
                if (key.startsWith(subKey)) {
                    this.dropCache(key);
                }
            });
        }
    },
});

moment().add('1d')
