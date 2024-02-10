<template>
    <div class="display-hint" :data-visible="displayHint">
        <div class="hint" @click="scrollToStreaks">
            <p>Top Streaks</p>
            <p class="bounce">↓</p>
        </div>
    </div>

    <div class="streak">
        <streak-header
            :current-tab="currentTab"
            @click="scrollToStreaks"
            @update:currentTab="updateCurrentTab"
        />

        <streak-table
            v-if="currentStreaks !== null && currentStreaks.length > 0"
            :users="currentStreaks"
            :streak-type="currentTab"
        />

        <p
            class="no-data-message" 
            v-else-if="currentStreaks !== null && currentStreaks.length === 0"
        >
            No streaks yet! Get started by registering an account and
            checking your birthday!
        </p>

        <spinning-loader v-else />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import streakHeader from './streak-header.vue';
import streakTable from './streak-table.vue';
import SpinningLoader from '@/shared/spinning-loader.vue';
import { StreaksApi } from '@/api/streaks';
import type { Streak } from '@/api/streaks';

const currentTab = ref<'birthday-streak' | 'streak'>('streak');
const dailyStreaks = ref<Streak[] | null>(null);
const birthdayStreaks = ref<Streak[] | null>(null);
const currentStreaks = ref<Streak[] | null>(null);

async function updateCurrentTab(nextTab: 'birthday-streak' | 'streak') {
    currentTab.value = nextTab;

    if (nextTab === 'streak') {
        await fetchDailyStreaks();
        currentStreaks.value = dailyStreaks.value;
    } else {
        await fetchBirthdayStreaks();
        currentStreaks.value = birthdayStreaks.value;
    }
}

async function fetchDailyStreaks() {
    const { data, subscribe } = await StreaksApi.topStreaks('daily');

    subscribe(response => updateStreakUsers(response.data));
    updateStreakUsers(data);

    function updateStreakUsers(data: Awaited<ReturnType<typeof StreaksApi.topStreaks>>['data']) {
        if ('error' in data) {
            dailyStreaks.value = [];
        } else {
            dailyStreaks.value = data.streaks;
        }

        if (currentTab.value === 'streak') {
            currentStreaks.value = dailyStreaks.value;
        }
    }
}

async function fetchBirthdayStreaks() {
    const { data, subscribe } = await StreaksApi.topStreaks('birthday');

    subscribe(response => updateStreakUsers(response.data));
    updateStreakUsers(data);

    function updateStreakUsers(data: Awaited<ReturnType<typeof StreaksApi.topStreaks>>['data']) {
        if ('error' in data) {
            birthdayStreaks.value = [];
        } else {
            birthdayStreaks.value = data.streaks;
        }

        if (currentTab.value === 'birthday-streak') {
            currentStreaks.value = birthdayStreaks.value;
        }
    }
}

onMounted(() => {
    updateCurrentTab('streak');
});

const displayHint = ref(false);
onMounted(() => {
    const streak = document.querySelector('.streak');
    const observer = new IntersectionObserver((entries) => {
        displayHint.value = !entries[0].isIntersecting;
    }, {
        root: null,
        rootMargin: '-30px',
        threshold: 0,
    });

    if (streak) {
        observer.observe(streak);
    }
});

function scrollToStreaks() {
    const streak = document.querySelector('.streak');
    streak?.scrollIntoView({ behavior: 'smooth' });

    displayHint.value = false;
}
</script>

<style lang='scss' scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .no-data-message {
        text-align: center;
        margin: 0px auto 2rem auto;
        padding: 1rem 1rem;
        background-color: var(--primary-color);
        border-radius: var(--border-radius);

        font-size: 1.5rem;
        font-weight: 700;
        width: 100%;
    }

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

    .streak {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        max-width: fit-content;
        margin: 0px auto 30px auto;
        border-radius: var(--border-radius);

        padding: 10px;
    }
}

// Mobile Styling
@media (max-width: $tablet-breakpoint) {
    .no-data-message {
        text-align: center;
        margin: 0px 5px 2rem 5px;
        padding: 1rem 1rem;
        background-color: var(--primary-color);
        border-radius: var(--border-radius);

        font-size: 1.5rem;
        font-weight: 700;
    }

    .display-hint {
        display: none;
    }
}
</style>
