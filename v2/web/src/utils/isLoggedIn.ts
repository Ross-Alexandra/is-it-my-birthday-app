import type { BirthdayString } from '../types/birthday';

// For testing purposes, we'll just wait a second before returning a user.
function wait(milliseconds: number){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
  }

export async function isLoggedIn() {
    await wait(5000);    

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
