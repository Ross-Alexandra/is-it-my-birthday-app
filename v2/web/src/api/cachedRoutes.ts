import { useApiCache } from './useApiCache';
import type { CacheDuration } from './useApiCache';

export type RouteConfigEntry<Handler extends (...args: any[]) => any> = {
    handler: Handler,
    duration: CacheDuration,
    cacheKey?: string | ((...args: Parameters<Handler>) => string),
};

// These really dense types basically just mean that we have an object
// with any keys, each of which are a RouteConfigEntry. The Generic is needed
// so that the call signature of the handler is preserved.
export type RouteConfig<T> = {[K in keyof T]: RouteConfigEntry<T[K] extends Record<string, any> ? T[K]['handler'] : never>};

export function cachedRoutes<T extends RouteConfig<T>>(routes: T): {[K in keyof T]: T[K] extends Record<string, any> ? T[K]['handler'] : never} {
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // The typing to get here is *really* messy, so we're just going to ignore getting the
    // return type correct here, it's absolutely not worth the effort for such a simple
    // transformation.
    return Object.fromEntries(
        Object.entries(routes).map(([routeName, routeConfig]: [string, any]) => {
            return [
                routeName,
                cacheOrApi.bind(null, routeName, routeConfig)
            ]
        })
    );

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
            return cacheHit
        }

        const apiResponse = await routeConfig.handler(...args);
        setCache(cacheKey, apiResponse, cacheDuration);

        return apiResponse;
    }
}
