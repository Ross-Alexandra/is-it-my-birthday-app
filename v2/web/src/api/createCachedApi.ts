import { useApiCache } from './useApiCache';
import type { CacheDuration } from './useApiCache';
import { ReactiveApiEmitter } from './reactiveEmitter';

export type Handler<U> = U extends Record<string, any> ? U['handler']: never;
export type ApiHandlers<T> = {[K in keyof T]: Handler<T[K]>};
export type CacheDroppers<T> = {[K in keyof T]: () => void};

export type RouteConfigEntry<U> = {
    handler: Handler<U>,
    duration: CacheDuration,
    cacheKey?: string | ((...args: Parameters<Handler<U>>) => string),
    after?: (response: ReturnType<Handler<U>>) => void,
};

// These really dense types basically just mean that we have an object
// with any keys, each of which are a RouteConfigEntry. The Generic is needed
// so that the call signature of the handler is preserved.
export type RouteConfig<T> = {[K in keyof T]: RouteConfigEntry<T[K]>};

export function createCachedApi<T>(routes: T): [ApiHandlers<T>, CacheDroppers<T>] {
    const cacheDroppers = Object.fromEntries(
        Object.entries(routes as RouteConfig<T>).map(([routeName, routeConfig]: [string, any]) => {
            return [
                routeName,
                () => {
                    const { dropSubCache } = useApiCache();
                    const cacheKey = getCacheKey(routeName, routeConfig);
                    dropSubCache(cacheKey);
                }
            ]
        })
    ) as CacheDroppers<T>;

    const api = Object.fromEntries(
        Object.entries(routes as RouteConfig<T>).map(([routeName, routeConfig]: [string, any]) => {
            return [
                routeName,
                cacheOrApi.bind(null, routeName, routeConfig)
            ]
        })
    ) as ApiHandlers<T>;

    return [api, cacheDroppers];

    async function cacheOrApi(routeName: string, routeConfig: RouteConfigEntry<any>, ...args: any[]) {
        const { getCache, setCache } = useApiCache();

        // Use the default cache key if none is provided, otherwise
        // use the provided cache key or the result of the cache key function.
        const cacheKey = getCacheKey(routeName, routeConfig, ...args);
        const cacheDuration = routeConfig.duration;
        
        // Short circuit if the cache duration is 0s.
        if (cacheDuration === '0s') {
            const response = await routeConfig.handler(...args);

            routeConfig?.after?.(response);
            ReactiveApiEmitter.emit(cacheKey, response);
            return {
                ...response,
                subscribe: (subscriber: (data: any) => void) => ReactiveApiEmitter.on(cacheKey, subscriber)
            };
        }

        const cacheHitResponse = getCache(cacheKey);
        if (cacheHitResponse) {
            const cacheHit = await cacheHitResponse;

            routeConfig?.after?.(cacheHit);
            ReactiveApiEmitter.emit(cacheKey, cacheHit);
            return {
                ...cacheHit,
                subscribe: (subscriber: (data: any) => void) => ReactiveApiEmitter.on(cacheKey, subscriber)
            };
        }

        const apiResponse = routeConfig.handler(...args);
        setCache(cacheKey, apiResponse, cacheDuration);

        const response = await apiResponse;

        routeConfig?.after?.(response);
        ReactiveApiEmitter.emit(cacheKey, response);
        return {
            ...response,
            subscribe: (subscriber: (data: any) => void) => ReactiveApiEmitter.on(cacheKey, subscriber)
        };
    }

    function getCacheKey(routeName: string, routeConfig: RouteConfigEntry<any>, ...args: any[]) {
        if (typeof routeConfig.cacheKey === 'string') {
            return routeConfig.cacheKey;
        } else if (typeof routeConfig.cacheKey === 'function') {
            return routeConfig.cacheKey(...args);
        } else {
            return `${routeName}:${args.join(':')}`;
        }
    }
}
