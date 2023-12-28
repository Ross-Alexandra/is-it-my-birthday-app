<template>
    <div class="dialog-content">
        <button
            class="dialog-close"
            @click="emit('close-dialog')"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24">
                <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
        </button>

        <div class="dialog-header">
            <template v-if="!birthdayIsSet">
                <h2 v-if="!birthdayIsSet">Is today your confetti moment?</h2>
                <h3 v-if="!birthdayIsSet">Enter your birthday to find out!</h3>
            </template>

            <template v-else-if="todayIsBirthday">
                <h2>{{ randomMessage('birthdayMatch') }}</h2>
                <img :src="randomMessage('birthdayMatchImages')" alt="confetti" />
            </template>

            <template v-else>
                <h2>{{ randomMessage('birthdayNoMatch') }}</h2>
                <img :src="randomMessage('birthdayNoMatchImages')" alt="confetti" />
            </template>
        </div>

        <div class="dialog-body">
            <div
                v-if="!birthdayIsSet"
                class="birthday-input"
                title="psst, you can scroll me!"
            >
                <scrolling-input
                    :initialIndex="5"
                    :options="months"
                    @change="setMonth"
                />

                <scrolling-input
                    :initialIndex="14"
                    :options="Array.from({ length: 31 }, (_, i) => i + 1).map(day => day.toString().padStart(2, '0'))"
                    @change="setDay"
                />
            </div>
        </div>

        <div class="dialog-footer">
            <button
                v-if="!birthdayIsSet"
                class="btn btn-primary"
                ref="submitButton"
                @click="submitBirthday"
            >
                {{ todaysMessage }}
            </button>

            <a
                v-else
                class="sign-up-message"
            >
                Sign up to get on the leaderboard!
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { getBirthday } from '@/utils/getBirthday';
import { random } from '@/utils/seededRandom';
import PopupMessages from '@/copy/popup-messages.json';
import ScrollingInput from '@/pages/home/components/scrolling-input.vue';

const userBirthday = await getBirthday();
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const emit = defineEmits(['close-dialog']);

const todaysMessage = PopupMessages.birthdayButton[new Date().getDay()];

const dayInput = ref<HTMLInputElement | null>(null);
const submitButton = ref<HTMLButtonElement | null>(null);

const birthday = ref({ 
    month: userBirthday?.month || 6,
    day: userBirthday?.day || 15,
});

const birthdayIsSet = ref(userBirthday !== null);
const todayIsBirthday = computed(() => {
    if (!birthdayIsSet.value) return false;

    const today = new Date();
    return birthday.value?.month === today.getMonth() + 1 && birthday.value?.day === today.getDate();
});

function setMonth(nextValue: string) {
    const monthCode = months.findIndex(month => month === nextValue) + 1;

    if (!birthday.value) {
        birthday.value = {
            month: monthCode,
            day: 0, // 0 is falsy and an invalid day
        };
    } else {
        birthday.value.month = monthCode;
    }

    dayInput.value?.focus();
}

function setDay(nextValue: string) {
    const day = parseInt(nextValue);

    if (!birthday.value) {
        birthday.value = {
            month: 0, // 0 is falsy and an invalid month
            day,
        };
    } else {
        birthday.value.day = day;
    }
}

function submitBirthday() {
    if (birthday.value) {
        birthdayIsSet.value = true;
        // localStorage.setItem('birthday', `${birthday.value.month}-${birthday.value.day}`);
        localStorage.setItem('last-submit', new Date().getTime().toString());
    }
}

function randomMessage(type: keyof typeof PopupMessages) {
    const randomValue = random((new Date().getDay() * new Date().getMonth()) + new Date().getFullYear());
    return PopupMessages[type][Math.floor(randomValue * PopupMessages[type].length)];
}
</script>

<style lang="scss" scoped>
.dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 25px;
    width: fit-content;
    height: fit-content;
}

.dialog-header {
    display: flex;
    flex-direction: column;

    h2 {
        margin: 0 0 0 0;
        font-size: 2rem;
        max-width: 30ch;
    }

    h3 {
        font-size: 1.5rem;
        margin: 0 0 15px 0;
    }

    img {
        align-self: center;
    }
}

.dialog-close {
    position: absolute;
    top: 10px;
    right: 5px;

    border: unset;
    border-radius: 50%;

    background-color: transparent;

    cursor: pointer;

    &:hover {
        background-color: var(--backup-background-color-hover);
    }

    svg {
        fill: var(--primary-font-color);
    }
}

.birthday-input {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 15px;

    & > *:first-child {
        align-items: flex-end;
    }

    & > *:last-child {
        align-items: flex-start;
    }
}

.sign-up-message {
    font-size: 1.1rem;
    color: var(--primary-font-color);
    text-decoration: underline;
    cursor: pointer;
}
</style>
