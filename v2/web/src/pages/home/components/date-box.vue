<template>
    <div class="date-box">
        <div class="date-box__date">
            <p>{{ new Date().toLocaleString('default', { month: 'long' }) }}</p>
            <p class="focus">{{ moment().format("Do") }}</p>
        </div>
        <div class="date-box__other">
            <p class="focus">{{ moment().format("DDDo") }}</p>
            <p>Day</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
</script>

<style scoped lang="scss">
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .date-box {
        display: grid;
        grid-template-columns: 1fr 1fr;

        margin: 0px auto 0px auto;
        width: min-content;
        border-radius: var(--border-radius);
        overflow: hidden;

        box-shadow: var(--box-shadow);

        p {
            position: relative;
            font-size: 2.5rem;
            font-weight: 800;
            margin: 0px 10px;
        }

        &__date,
        &__other {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;

            width: 100%;
            height: 100%;
            padding: 10px 30%;
        }

        &__date {
            --focus-background-color: var(--secondary-color);
            background-color: var(--primary-color);
        }

        &__other {
            --focus-background-color: var(--primary-color);
            background-color: var(--secondary-color);
        }

        p.focus {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 6ch;
            padding: 10px;
            aspect-ratio: 1;
            border-radius: 50%;
            background-color: var(--focus-background-color);
            text-align: center;
            box-shadow: inset 0 -4px 5px -3px rgba(0, 0, 0, 0.3); /* Inner shadow effect */
        }
    }
}

// Mobile Styling
@media (max-width: $tablet-breakpoint) {
    .date-box {
        display: flex;
        flex-direction: column;
        margin: 0px 5px;

        border-radius: var(--border-radius);
        overflow: hidden;

        &__date,
        &__other {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;

            width: 100%;
            height: 100%;
            padding: 10px 70px;

            font-size: 1.5rem;
            font-weight: 800;

            p {
                margin: 10px 0px;
            }
        }

        &__date {
            --focus-background-color: var(--secondary-color);
            background-color: var(--primary-color);
        }

        &__other {
            --focus-background-color: var(--primary-color);
            background-color: var(--secondary-color);
        }
    }

    .focus {
        position: relative;
    }
    .focus::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 3px;
        background-color: var(--focus-background-color);
    }
}
</style>
