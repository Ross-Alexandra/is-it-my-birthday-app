<template>
    <nav :data-visible="navVisible">
        <router-link to="/home">
            <img src="/assets/icon/favicon-32x32.png" alt="logo" />
        </router-link>

        <div />

        <router-link v-if="user" to="/logout">
            <button class="btn btn-primary">Logout</button>
        </router-link>

        <router-link v-else to="/login">
            <button class="btn btn-primary">Login</button>
        </router-link>
    </nav>
    <router-view />
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
import { isLoggedIn } from '@/utils/isLoggedIn';
import type { User } from './api/auth';

const user = ref<User | null>(null);
onMounted(async () => {
    user.value = await isLoggedIn();
});

const navVisible = ref(true);
onMounted(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navVisible.value = false;
        } else {
            navVisible.value = true;
        }
    });
});
</script>

<style lang='scss' scoped>
@import '@/theme.scss';

nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;

    // Extra calc to appease scss-lint
    padding: 0px calc(max(15%, calc((100vw - 1920px) / 2)));
    display: grid;
    place-items: center;
    grid-template-columns: 40px 1fr 40px;

    background-color: rgba(255, 255, 255, 0.4);
    color: #fff;

    transition: opacity 0.3s ease-in-out;
}

nav[data-visible='false'] {
    opacity: 0;
}

nav[data-visible='true'] {
    opacity: 1;
}

nav a {
    width: 32px;
    height: 32px;
}

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
}

// Mobile Styling
@media (max-width: $tablet-breakpoint) {
}
</style>
