import type { AxiosResponse } from 'axios';
import type { CapacitorResponse } from './capacitorHttpWrapper';

type Response<T> = Promise<AxiosResponse<T> | CapacitorResponse<T>>;

export interface Api {
    get: <T>(url: string, options?: any) => Promise<Response<T>>;
    post: <T>(url: string, data: Record<string, unknown>, options?: any) => Promise<Response<T>>;
    put: <T>(url: string, data: Record<string, unknown>, options?: any) => Promise<Response<T>>;
    patch: <T>(url: string, data: Record<string, unknown>, options?: any) => Promise<Response<T>>;
    delete: <T>(url: string, data: Record<string, unknown>, options?: any) => Promise<Response<T>>;
}
