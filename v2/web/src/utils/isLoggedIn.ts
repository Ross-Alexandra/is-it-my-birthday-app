import type { BirthdayString } from '../types/birthday';

export async function isLoggedIn() {
    // This function has not yet been implemented.
    // For now we'll just populate a fake user.
    const userIsLoggedIn = localStorage.getItem('token');
    if (userIsLoggedIn) {
        return {
            id: '1',
            name: 'Test User',
            birthday: '01-01' as BirthdayString,
        };
    } else {
        return null;
    }
}
