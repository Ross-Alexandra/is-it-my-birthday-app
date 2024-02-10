import type { Birthday, BirthdayString } from '@/types/birthday';

export function parseBirthday(birthday: BirthdayString): Birthday {
    const [month, day] = birthday.split('-');

    return {
        day: parseInt(day),
        month: parseInt(month),
    }
}
