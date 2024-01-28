<template>
    <div class="hero">
        <div class="hero-image">
            <img src="/assets/party-man.png" alt="Party Man" />
        </div>

        <div class="hero-content">
            <h1 v-if="user" class="user-welcome">Hi, {{ user.name }}!</h1>
            <h1>Every day could be your party!</h1>
            <div class="buttons">
                <button class="btn btn-primary" @click="emit('openDialog')">Is today your confetti moment?</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isLoggedIn } from '@/utils/isLoggedIn';
import { ref, onBeforeMount } from 'vue';
import type { User } from '@/api/auth';

const emit = defineEmits(['openDialog']);
const user = ref<User | null>(null);

onBeforeMount(async () => {
    user.value = await isLoggedIn();
});
</script>

<style lang="scss" scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .hero {
        display: grid;
        grid-template-columns: 1fr 1fr;

        margin: 10vh;
    }

    .hero h1 {
        font-size: 4rem;
        max-width: 600px;
        font-weight: 800;

        margin: 0px 0px 2rem 0px;
    }

    .hero .user-welcome {
        font-size: 4rem;
        max-width: 600px;
        font-weight: 800;

        margin: 0px;
    }

    .hero .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .hero .buttons .btn {
        font-size: 1.5rem;
        padding: 1rem 2rem;
    }

    .hero .hero-image {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
    }

    .hero .hero-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
}

// Mobile styling
@media (max-width: $tablet-breakpoint) {
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .hero-image img {
        height: 35svh;
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .hero-content h1 {
        font-size: 2.5rem;
        max-width: 600px;
        font-weight: 800;

        text-align: center;
        margin-bottom: 2rem;
    }

    .hero-content button {
        font-size: 1.25rem;
        margin-bottom: 2.5rem;
    }
}
</style>
