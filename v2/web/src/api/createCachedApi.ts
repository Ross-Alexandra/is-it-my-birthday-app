import { useApiCache } from './useApiCache';
import type { CacheDuration } from './useApiCache';

export type Handler<U> = U extends Record<string, any> ? U['handler'] : never;
export type ApiHandlers<T> = {[K in keyof T]: Handler<T[K]>};

export type RouteConfigEntry<U> = {
    handler: Handler<U>,
    duration: CacheDuration,
    cacheKey?: string | ((...args: Parameters<Handler<U>>) => string),
};

// These really dense types basically just mean that we have an object
// with any keys, each of which are a RouteConfigEntry. The Generic is needed
// so that the call signature of the handler is preserved.
export type RouteConfig<T> = {[K in keyof T]: RouteConfigEntry<T[K]>};

export function createCachedApi<T extends RouteConfig<T>>(routes: T): ApiHandlers<T> {
    return Object.fromEntries(
        Object.entries(routes).map(([routeName, routeConfig]: [string, any]) => {
            return [
                routeName,
                cacheOrApi.bind(null, routeName, routeConfig)
            ]
        })
    ) as ApiHandlers<T>;

    async function cacheOrApi(routeName: string, routeConfig: RouteConfigEntry<any>, ...args: any[]) {
        const { getCache, setCache } = useApiCache();
        const cacheDuration = routeConfig.duration;
        
        // Short circuit if the cache duration is 0s.
        if (cacheDuration === '0s') {
            const apiResponse = await routeConfig.handler(...args);
            return apiResponse;
        }

        // Use the default cache key if none is provided, otherwise
        // use the provided cache key or the result of the cache key function.
        let cacheKey = `${routeName}:${args.join(':')}`;
        if (typeof routeConfig.cacheKey === 'string') {
            cacheKey = routeConfig.cacheKey;
        } else if (typeof routeConfig.cacheKey === 'function') {
            cacheKey = routeConfig.cacheKey(...args);
        }

        const cacheHit = getCache(cacheKey);
        if (cacheHit) {
            return await cacheHit
        }

        const apiResponse = routeConfig.handler(...args);
        setCache(cacheKey, apiResponse, cacheDuration);

        return await apiResponse;
    }
}
