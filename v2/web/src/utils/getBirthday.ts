import { BirthdayString } from '@/types/birthday';
import { isLoggedIn } from './isLoggedIn';
import { parseBirthday } from './parseBirthday';

export async function getBirthday() {
    const user = await isLoggedIn();

    if (user) {
        return parseBirthday(user.birthday);
    } else {
        const storedBirthday = localStorage.getItem('birthday') as BirthdayString;
        if (storedBirthday) {
            return parseBirthday(storedBirthday);
        } else {
            return null;
        }
    }
}
