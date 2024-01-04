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
        </div>
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
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .register-panel {
        display: flex;
        flex-direction: column;

        h1 {
            margin: 0px 0px 10px 0px;
        }

        button {
            align-self: start;
        }
    }

    .signup-info {
        display: grid;
        grid-template-areas:
            "picture info"
            "picture cta";
        grid-template-columns: fit-content 5fr;
        grid-gap: 10px;

        picture,
        img {
            grid-area: picture;
            align-self: center;
            justify-self: end;

            height: 100%;
            object-fit: contain;
        }

        h1 {
            grid-area: info;
            margin: 0px 0px 10px 0px;
            align-self: end;
        }

        .signup-cta {
            grid-area: cta;
            align-self: end;
        }
    }

    .register-info {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        margin: 0px auto 20px auto;

        max-width: 50%;

        .register-title {
            grid-column: 1 / -1;
            margin: 0px 0px 10px 0px;
        }

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
            align-self: start;
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
        gap: 10px;

        .register-title {
            margin: 0px 0px 10px 0px;
        }
    }

    .register-info > label[data-for="name"] > input {
        margin-bottom: 10px;
    }

    .register-info > label[data-for="birthday"] {
        width: 100%;
        }

    button {
        margin-top: 10px;
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
