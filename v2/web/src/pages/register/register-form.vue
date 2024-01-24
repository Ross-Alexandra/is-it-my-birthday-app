<template>
    <panel-page>
        <div class="register-panel">
            <div class="signup-info">
                <picture>
                    <source 
                        srcset="/assets/register.png"
                        media="(min-width: 801px)"
                        width="125px"
                        height="125px"
                        alt="register"
                    />
                    <source 
                        srcset="/assets/register.png"
                        media="(max-width: 800px)"
                        width="125px"
                        height="125px"
                        alt="register"
                    />
                    <img
                        src="/assets/register.png"
                        width="200px"
                        height="200px"
                        alt="register"
                    />
                </picture>

                <h1>Join the Birthday Countdown!</h1>
                <p class="signup-cta">
                    Get your party hats on standby! Sign up to track your birthday
                    anticipation streak, earn your spot on the leaderboard, and enjoy a
                    daily dose of fun. Because every day
                    is a step closer to your slice of the birthday cake!
                </p>
            </div>

            <div class="divider" />

            <div class="register-info">
                <h3 class="register-title">Your Info</h3>

                <label data-for="name">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        v-model="name"
                    />
                    <span 
                        v-if="errors.name"
                        class="error"
                    >
                        {{ errors.name }}
                    </span>
                </label>

                <label data-for="email">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        v-model="email"
                    />
                    <span 
                        v-if="errors.email"
                        class="error"
                    >
                        {{ errors.email }}
                    </span>
                </label>

                <label data-for="birthday">
                    <h3>Your Birthday</h3>
                    <birthday-input
                        :initialDay="birth_day"
                        :initialMonth="birth_month"
                        @change:day="setDay"
                        @change:month="setMonth"
                    />
                </label>

                <label data-for="tos">
                    <input
                        type="checkbox"
                        name="tos"
                        v-model="tos_agree"
                        required
                    />
                    <span class="legal">
                        I agree to the <a href="/legal">Legal Terms</a>
                        - it&apos;s shorter than your birthday wishlist!
                    </span>
                    <span 
                        v-if="errors.tos_agree"
                        class="error"
                    >
                        {{ errors.tos_agree }}
                    </span>
                </label>

                <div class="signup-cta">
                    <button
                        class="btn btn-primary"
                        @click="signup"    
                    >
                        Start My Streak!
                    </button>

                    <span 
                        v-if="props.registerError"
                        class="error"
                    >
                        {{ props.registerError }}
                    </span>
                </div>
            </div>

            <div class="divider" />

            <p class="legal">
                Say goodbye to passwords! Sign in with a secure link sent straight to your email. Safe, simple, and no passwords to remember!
            </p>
        </div>
    </panel-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BirthdayInput, { getMonthNumber } from '@/shared/birthday-input.vue';
import type { Months } from '@/shared/birthday-input.vue';
import PanelPage from '@/shared/panel-page.vue';

const emit = defineEmits(['signup']);
const props = defineProps<{
    registerError: string | null;
}>();

const name = ref<string>('');
const email = ref<string>('');
const birth_day = ref<number>(15);
const birth_month = ref<Months>("June");
const tos_agree = ref<boolean>(false);

const errors = ref({
    name: '',
    email: '',
    tos_agree: '',
});

watch(name, () => {
    errors.value.name = '';
});

watch(email, () => {
    errors.value.email = '';
});

watch(tos_agree, () => {
    errors.value.tos_agree = '';
});

function setDay(day: string) {
    birth_day.value = parseInt(day);
}

function setMonth(month: Months) {
    birth_month.value = month;
}

function validateName() {
    if (name.value.length < 3) {
        return 'Name must be at least 3 characters.';
    } else if (name.value.length > 50) {
        return 'Name must be less than 50 characters.';
    } else {
        return '';
    }
} 

function validateEmail() {
    if (email.value.length < 3) {
        return 'Email must be at least 3 characters.';
    } else if (email.value.length > 50) {
        return 'Email must be less than 50 characters.';
    } else {
        return '';
    }
}

function validateTOS() {
    if (!tos_agree.value) {
        return 'Please agree to the terms of service.';
    } else {
        return '';
    }
}

function signup() {     
    const nameError = validateName();
    if (nameError) {
        errors.value.name = nameError;
    }

    const emailError = validateEmail();
    if (emailError) {
        errors.value.email = emailError;
    }

    const tosError = validateTOS();
    if (tosError) {
        errors.value.tos_agree = tosError;
    }


    if (!nameError && !emailError && !tosError) {
        emit('signup', {
            name: name.value,
            email: email.value,
            birth_day: birth_day.value,
            birth_month: getMonthNumber(birth_month.value),
        });
    } 
}
</script>

<style lang='scss' scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .register-panel {
        display: flex;
        flex-direction: column;

        max-width: 55vw;

        button {
            align-self: start;
        }
    }

    .signup-info {
        display: grid;
        grid-template-areas:
            "picture info"
            "picture cta";
        grid-template-columns: 2fr 5fr;
        grid-gap: 5px 10px;

        picture,
        img {
            grid-area: picture;
            align-self: center;
            justify-self: center;

            height: 100%;
            object-fit: contain;
        }

        h1, p {
            margin: 0px;
        }

        h1 {
            grid-area: info;
            align-self: end;
        }

        .signup-cta {
            grid-area: cta;
            align-self: start;

            max-width: 65ch;
        }
    }

    .register-info {
        display: flex;
        flex-direction: column;
        grid-gap: 10px;
        margin: 0px auto 20px auto;

        width: fit-content;

        .signup-cta {
            margin-top: 15px;
            display: flex;
            flex-direction: column;

            span.error {
                font-size: 1rem;
                text-align: start;
                margin: 5px 0px 0px 0px;

                text-transform: capitalize;
            }
        }

        .register-title {
            grid-column: 1 / -1;
            margin: 0px;
        }

        label {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            span {
                margin-bottom: 5px;
            }

            span.error {
                color: var(--error-color);
                font-size: .75rem;
                text-align: start;
                margin-left: 5px;
            }

            input {
                width: 100%;
                padding: 5px 10px;
            }
        }

        & > label[data-for="birthday"] {
            width: 100%;
            align-items: center;
            grid-column: 1 / -1;

            h3 {
                width: 100%;
                text-align: start;
            }
        }

        & > label[data-for="tos"] {
            display: grid;
            grid-template-columns: 50px 1fr;
            grid-column: 1 / -1;
            align-items: flex-start;
            justify-content: flex-start;

            input {
                flex-basis: 30px;
                margin-right: 5px;
            }

            span {
                text-align: start;
            }

            span.error {
                grid-column: 2;
                text-align: start;
                margin-left: 0px;
            }
        }
    }

    .divider {
        width: 100%;
        height: 1px;
        margin: 15px 0px;

        background-color: var(--primary-font-color);
        opacity: 0.25;
    }

    .legal {
        font-size: .75rem;
        text-align: center;
        opacity: 0.75;
    }
}

// Mobile Styling
@media (max-width: $tablet-breakpoint) {
    .register-panel {
        display: flex;
        flex-direction: column;

        h1 {
            margin: 0px 0px 10px 0px;
        }

        button {
            margin-top: 10px;
            align-self: center;
        }
    }

    .signup-info {
        display: grid;
        grid-template-areas:
            "picture picture"
            "info info";
        grid-template-columns: 1fr 1fr;
        grid-gap: 10px;

        picture,
        img {
            grid-area: picture;
            justify-self: center;

            height: 100%;
            object-fit: contain;
        }

        h1 {
            grid-area: info;
            margin: 0px 0px 10px 0px;
            justify-self: center;
        }

        .signup-cta {
            grid-area: cta;
            align-self: end;
            display: none;
        }
    }

    .register-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        .register-title {
            margin: 0px 0px 10px 0px;
        }

        span.error {
            color: var(--error-color);
            font-size: .75rem;
            text-align: start;
        }
    }

    .register-info > label[data-for="name"] > input {
        margin-bottom: 10px;
    }

    .divider {
        width: 100%;
        height: 1px;
        margin: 20px 0px;

        background-color: var(--primary-font-color);
        opacity: 0.25;
    }

    .legal {
        font-size: .75rem;
        text-align: center;
        opacity: 0.75;

        a {
            color: var(--primary-font-color);
        }
    }
}
</style>
