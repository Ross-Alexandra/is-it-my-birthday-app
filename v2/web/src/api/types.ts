import type { AxiosResponse } from 'axios';
import type { CapacitorResponse } from './capacitorHttpWrapper';

export type ApiResponse<T> = Promise<(AxiosResponse<T> | CapacitorResponse<T>) & { subscribe: (subscriber: (data: any) => void) => void }>;

export interface Api {
    get: <T>(url: string, options?: any) => Promise<ApiResponse<T>>;
    post: <T>(url: string, data: Record<string, unknown>, options?: any) => Promise<ApiResponse<T>>;
    put: <T>(url: string, data: Record<string, unknown>, options?: any) => Promise<ApiResponse<T>>;
    patch: <T>(url: string, data: Record<string, unknown>, options?: any) => Promise<ApiResponse<T>>;
    delete: <T>(url: string, data: Record<string, unknown>, options?: any) => Promise<ApiResponse<T>>;
}
