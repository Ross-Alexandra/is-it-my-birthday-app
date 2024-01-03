import { isLoggedIn } from './isLoggedIn';
import { parseBirthday } from './parseBirthday';
import type { BirthdayString } from '@/types/birthday';

export async function getBirthday() {
    const user = await isLoggedIn();

    if (!user) {
        const birthday = localStorage.getItem('birthday') as BirthdayString;
        if (!birthday) {
            return null;
        }

        return parseBirthday(birthday);
    } else {
        return parseBirthday(user.birthday);
    }
}
