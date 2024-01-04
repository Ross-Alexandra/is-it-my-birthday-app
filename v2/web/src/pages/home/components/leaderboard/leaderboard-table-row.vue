<template>
    <div class="leaderboard-table-row">
        <div class="leaderboard-table-row__rank">
            <h2>{{ rank }}</h2>
        </div>

        <div class="leaderboard-table-row__user">
            <h3>{{ user.name }}</h3>
            <p>{{ streak }} {{ streakText }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    rank: number | string;
    user: {
        name: string,
    },
    streak: number | string,
    streakText: string,
}>();
</script>

<style lang="scss" scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .leaderboard-table-row {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        align-items: center;
        justify-items: start;
        width: calc(100% - var(--row-margin));
        height: 100%;
        padding: 10px 50px;

        background-color: var(--background-color);
        margin: 0px var(--row-margin) 3px 0px;

        border-radius: var(--border-radius);

        &:last-child {
            border-bottom: none;
        }

        h2 {
            font-size: 2rem;
        }

        h3 {
            font-size: 1.5rem;
        }

        h2, h3, p {
                font-weight: 800;
                color: var(--rank-color);
        }

        &__user {
            display: flex;
            flex-direction: column;

            h3, p {
                margin: unset;
            }
        }
    }
}

@media (max-width: $tablet-breakpoint) {
    .leaderboard-table-row {
        display: grid;
        
        grid-template-columns: 1fr 3fr;
        gap: 10px;
        place-items: center;
        width: 100%;

        padding: 10px 20px;

        background-color: var(--background-color);
        margin: 0px var(--row-margin) 3px 0px;

        border-radius: var(--border-radius);


        &__user {
            justify-self: start;
        }

        p, h3 {
            margin: unset;
        }
    }
}
</style>
