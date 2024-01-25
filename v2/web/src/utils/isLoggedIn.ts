import { AuthApi } from '@/api/auth';

export async function isLoggedIn() {
    try {
        const me = await AuthApi.me();

        console.log('got me!', me);
        if (!me.data.error) {
            return me.data;
        }
    } catch {
        return null;
    }
}
