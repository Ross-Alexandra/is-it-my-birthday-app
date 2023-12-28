<template>
    <div class="display-hint" :data-visible="displayHint">
        <div class="hint" @click="scrollToLeaderboards">
            <p>Leaderboards</p>
            <p class="bounce">↓</p>
        </div>
    </div>

    <div class="leaderboard">
        <leaderboard-header
            :current-tab="currentTab"
            @update:currentTab="nextTab => currentTab = nextTab"
        />

        <leaderboard-table 
            :users="currentTab === 'birthday-streak' ? birthdayStreakUsers : streakUsers"
            :streak-type="currentTab"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import LeaderboardHeader from './leaderboard-header.vue';
import LeaderboardTable from './leaderboard-table.vue';

const currentTab = ref<'birthday-streak' | 'streak'>('birthday-streak');

const birthdayStreakUsers = [{
    id: 1,
    name: 'Keirran',
    rank: 1,
    streak: 104,
}, {
    id: 2,
    name: 'Callista',
    rank: 2,
    streak: 95,
}, {
    id: 15,
    name: 'Ross',
    streak: 77,
},{
    id: 23,
    name: 'Cassie',
    streak: 68,
}, {
    id: 4,
    name: 'Michael',
    streak: 50,
}];

const streakUsers = [{
    id: 1,
    name: 'Callista',
    streak: 54,
}, {
    id: 2,
    name: 'Keirran',
    streak: 5,
}, {
    id: 15,
    name: 'Ross',
    streak: 3,
}];

const displayHint = ref(false);
onMounted(() => {
    const leaderboard = document.querySelector('.leaderboard');
    const observer = new IntersectionObserver((entries) => {
        displayHint.value = !entries[0].isIntersecting;
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    });

    if (leaderboard) {
        observer.observe(leaderboard);
    }
});

function scrollToLeaderboards() {
    const leaderboard = document.querySelector('.leaderboard');
    leaderboard?.scrollIntoView({ behavior: 'smooth' });

    displayHint.value = false;
}
</script>

<style lang='scss' scoped>
    .display-hint {
        position: fixed;
        bottom: 0px;
        left: 0;
        right: 0;
        z-index: -1000;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        cursor: none;

        @media (max-height: 875px) {
            left: unset;
        }

        &[data-visible="true"] {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
            z-index: 1000;
            pointer-events: all;
        }

        .hint {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 1rem 2rem;
            margin: 0 1rem;

            p {
                margin: 0px;
                font-size: 1.5rem;
                color: var(--secondary-font-color);
                cursor: pointer;
            }
        }

        p.bounce {
            margin-left: 1rem;
            animation: bounce 5s infinite;
        }

        @keyframes bounce {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(5px);
            }
            100% {
                transform: translateY(0);
            }
        }
    }

    .leaderboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        max-width: fit-content;
        //background-color: var(--primary-color);
        margin: 0px auto 30px auto;
        border-radius: var(--border-radius);

        padding: 10px;
        // box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    }
</style>
