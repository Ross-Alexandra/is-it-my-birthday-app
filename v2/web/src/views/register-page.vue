<template>
    <panel-page>
        <h1>Join the Birthday Countdown!</h1>
        <img 
            src="/assets/register.png"
            width="200px"
            height="200px"
            alt="register"
        />
        
        <p>
            Get your party hats on standby! Sign up to track your birthday
            anticipation streak, earn your spot on the leaderboard, and enjoy a
            daily dose of fun. Because every day
            is a step closer to your slice of the birthday cake!
        </p>

        <div class="register-info">
            <label data-for="name">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                />
            </label>

            <label data-for="email">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
            </label>

            <label data-for="birthday">
                <h3>Your Birthday</h3>
                <birthday-input
                    @change:day="setDay"
                    @change:month="setMonth"
                />
            </label>

            <label data-for="tos">
                <input
                    type="checkbox"
                    name="tos"
                    required
                />
                <span class="legal">
                    I agree to the <a href="/legal">Legal Terms</a>
                    - it&apos;s shorter than your birthday wishlist!
                </span>
            </label>
        </div>

        <button class="btn btn-primary">
            Start My Streak!
        </button>

        <div class="divider" />

        <p class="legal">
            Say goodbye to passwords! Sign in swiftly with a secure link sent straight to your email. Safe, simple, and no passwords to remember!
        </p>
    </panel-page>
</template>

<script setup lang="ts">
import BirthdayInput, { getMonthNumber } from '@/shared/birthday-input.vue';
import type { Months } from '@/shared/birthday-input.vue';
import PanelPage from '@/shared/panel-page.vue';

function setDay(day: string) {
    console.log(day);
}

function setMonth(month: Months) {
    console.log(getMonthNumber(month));
}
</script>

<style lang='scss' scoped>
.register-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-bottom: 20px;

    max-width: 50%;

    label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        span {
            margin-bottom: 5px;
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
        flex-direction: row;
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
    }
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
}
</style>
