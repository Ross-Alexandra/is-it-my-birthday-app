import { AuthApi } from '@/api/auth';

export async function isLoggedIn() {
    try {
        const me = await AuthApi.me();

        if ('error' in me.data) {
            return null;
        } else {
            return me.data;
        }
    } catch (err) {
        console.error('error caught while fetching user: ', err);
        return null;
    }
}
