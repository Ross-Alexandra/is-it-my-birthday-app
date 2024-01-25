import { AuthApi } from '@/api/auth';

export async function isLoggedIn() {
    try {
        const me = await AuthApi.me();

        if (!me.data.error) {
            return me.data;
        }
    } catch {
        return null;
    }
}
