<template>
    <div class="leaderboard-table">
        <leaderboard-table-row
            v-for="(user, index) in users"
            :key="user.id"
            :rank="index + 1"
            :user="user"
            :streak="user.streak"
            :streak-text="streakMessages[index]"
        />

        <leaderboard-table-row
            v-if="users.length < 10"
            :rank="`${users.length + 1} - 10`"
            :user="{ name: 'This could be you' }"
            :streak="0"
            :streak-text="streakMessages[users.length]"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import messages from '@/copy/leaderboard-messages.json';
import leaderboardTableRow from './leaderboard-table-row.vue';

const props = defineProps<{
    streakType: 'birthday-streak' | 'streak',
    users: {
        id: number,
        name: string,
        streak: number,
    }[],
}>();

const streakMessages = computed(() => {
    return messages[props.streakType];
});
</script>

<style lang="scss" scoped>
.leaderboard-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;

    --rank-color: var(--on-primary-color);
    --background-color: var(--primary-color);
}

.leaderboard-table > *:nth-child(1),
.leaderboard-table > *:nth-child(2),
.leaderboard-table > *:nth-child(3) {
    --rank-color: var(--on-secondary-color);
    --background-color: var(--secondary-color);
}

.leaderboard-table > *:nth-child(1) {
    --row-margin: 0px;
}

.leaderboard-table > *:nth-child(2) {
    --row-margin: 30px;
}

.leaderboard-table > *:nth-child(3) {
    --row-margin: 60px;
}

.leaderboard-table > *:nth-child(n+4) {
    --row-margin: 90px;
}
</style>
