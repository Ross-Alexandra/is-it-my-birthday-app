import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

export type HttpVerbFn = (options: HttpOptions) => Promise<HttpResponse>;

export interface CapacitorResponse<T> extends HttpResponse {
    data: T;
}

function decodeCookie(cookie: string) {
    const cookiePairs = cookie.split('=');

    // Parse out the cookie name & value, keeping in mind that the value
    // will be wrapped in quotes
    const cookieName = cookiePairs[0];

    const cookieValue = cookiePairs[1].startsWith('"') && cookiePairs[1].endsWith('"')
        ? cookiePairs[1].slice(1, -1)
        : cookiePairs[1];

    return [cookieName, cookieValue];
}

function encodeCookie(cookieName: string, cookieValue: unknown) {
    return `${cookieValue}`.includes(' ')
        ? `${cookieName}="${cookieValue}"`
        : `${cookieName}=${cookieValue}`;
}

async function CapacitorSetCookiesMiddleware(request: HttpOptions) {
    const cookies = await Preferences.get({ key: 'cookies' });

    if (cookies.value) {
        const cookiesObject = JSON.parse(cookies.value);
        const cookieString = Object.entries(cookiesObject)
            .map(([cookieName, cookieValue]) => encodeCookie(cookieName, cookieValue))
            .join('; ');

        request = {
            ...request,
            headers: {
                ...request.headers,
                'Cookie': cookieString,
            }
        }
    }

    return request;
}

async function CapacitorStoreCookiesMiddleware<T>(response: CapacitorResponse<T>) {
    const cookiesHeaderString = response.headers['set-cookie'];
    const cookieValueStrings = cookiesHeaderString?.split(',').map(
        cookieString => cookieString.split(';')[0]
    )

    if (cookieValueStrings) {
        for (const cookieString of cookieValueStrings) {
            // If the cookie string doesn't match the 
            // format name=value, then skip it. This can be
            // caused by the 'expires' attribute being set,
            // which will cause the cookie to look like:
            // name=value; expires=DOW, DD-MMM-YYYY HH:MM:SS GMT
            // Since DOW is comma suffixed, it will be treated as
            // a cookie string by the above split.
            if (!/^(.*)=(.*)$/.test(cookieString)) {
                continue;
            }

            const [ cookieName, cookieValue ] = decodeCookie(cookieString);

            // Parse the existing cookies from the JSON stored in preferences
            const currentCookiesString = (await Preferences.get({ key: 'cookies' })).value ?? '{}';
            const currentCookies = JSON.parse(currentCookiesString);

            // Add the new cookie to the existing cookies
            const newCookies = { 
                ...currentCookies,
                [cookieName]: cookieValue
            }; 

            Preferences.set({ key: 'cookies', value: JSON.stringify(newCookies) });
        }
    }

    return response;
}

async function capacitorRequest<T>(httpVerbFn: HttpVerbFn, options: HttpOptions): Promise<CapacitorResponse<T>> {
    // Setup a transformation so that we can add request middleware
    const transformedOptions = await CapacitorSetCookiesMiddleware(options);

    const response = await httpVerbFn(transformedOptions);

    const transformedResponse = await CapacitorStoreCookiesMiddleware(response);
    return transformedResponse;
}

/**
 * Safely combines a base URL and a route to an endpoint.
 * 
 * @param baseUrl - The base URL of the API
 * @param url - The route to the endpoint
 * @returns - The full URL
 */
function getUrl(baseUrl: string, url: string) {
    const safeBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const safeUrl = url.startsWith('/') ? url.slice(1) : url;
    return `${safeBase}/${safeUrl}`;
}

/**
 * Safely combines the HttpOptions for a request with the global headers.
 * 
 * @param options - The options for the request
 * @param headers - The headers to add to the request
 * @returns - The combined options 
 */
function appendHeaders(options: HttpOptions, headers: Record<string, string>) {
    return {
        ...options,
        headers: {
            ...options.headers,
            ...headers,
        }
    };
}

export function CapacitorApi(baseUrl: string, headers: Record<string, string> = {}) {
    return {
        get<T>(url: string, options?: Partial<HttpOptions>) {
            return capacitorRequest<T>(
                CapacitorHttp.get,
                appendHeaders({ url: getUrl(baseUrl, url), ...options }, headers)
            ) as Promise<CapacitorResponse<T>>;
        },

        post<T>(url: string, body?: Record<string, unknown>, options?: Partial<HttpOptions>) {
            return capacitorRequest<T>(
                CapacitorHttp.post,
                appendHeaders({ url: getUrl(baseUrl, url), data: body, ...options }, headers)
            ) as Promise<CapacitorResponse<T>>;
        },

        put<T>(url: string, body?: Record<string, unknown>, options?: Partial<HttpOptions>) {
            return capacitorRequest<T>(
                CapacitorHttp.put,
                appendHeaders({ url: getUrl(baseUrl, url), data: body, ...options }, headers)
            ) as Promise<CapacitorResponse<T>>;
        },

        patch<T>(url: string, body?: Record<string, unknown>,options?: Partial<HttpOptions>) {
            return capacitorRequest<T>(
                CapacitorHttp.patch,
                appendHeaders({ url: getUrl(baseUrl, url), data: body, ...options }, headers)
            ) as Promise<CapacitorResponse<T>>;
        },
        
        delete<T>(url: string, body?: Record<string, unknown>, options?: Partial<HttpOptions>) {
            return capacitorRequest<T>(
                CapacitorHttp.delete,
                appendHeaders({ url: getUrl(baseUrl, url), data: body, ...options }, headers)
            ) as Promise<CapacitorResponse<T>>;
        },
    };
}
