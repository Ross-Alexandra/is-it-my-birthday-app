import { AuthApi } from '@/apis';

export async function isLoggedIn() {
    try {
        const me = await AuthApi.get('/me');

        if (!me.data.error) {
            return me.data;
        }
    } catch {
        return null;
    }
}
