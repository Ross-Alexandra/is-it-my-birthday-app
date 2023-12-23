<template>
    <div class="display-hint" :data-visible="displayHint">
        <div class="hint" @click="scrollToLeaderboards">
            <p>Leaderboards</p>
            <p class="bounce">↓</p>
        </div>
    </div>

    <div class="leaderboard">
        <div class="tabbed-table">
            <div class="tab">
                <h2>The most birthdayful?</h2>
            </div>
            <div class="tab">
                <h2>The almost birthday hero</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const displayHint = ref(false);
onMounted(() => {
    const leaderboard = document.querySelector('.leaderboard');
    const observer = new IntersectionObserver((entries) => {
        displayHint.value = !entries[0].isIntersecting;
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    });

    observer.observe(leaderboard);
});

function scrollToLeaderboards() {
    const leaderboard = document.querySelector('.leaderboard');
    leaderboard.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style lang='scss' scoped>
    .display-hint {
        position: fixed;
        bottom: 0px;
        left: 0;
        right: 0;
        z-index: 1000;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        opacity: 0;

        @media (max-height: 875px) {
            left: unset;
        }

        &[data-visible="true"] {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
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
    }

    .leaderboard .tabbed-table {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .leaderboard .tabbed-table .tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem 2rem;
        margin: 0 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .leaderboard .tabbed-table .tab h2 {
        font-size: 2rem;
        text-align: center;
        max-width: 600px;
        margin-bottom: 2rem;
    }
</style>
