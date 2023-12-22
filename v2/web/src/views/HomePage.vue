<template>
    <h1>Home!</h1>
    <router-link to="/login">login</router-link>
    <router-link to="/register">register</router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
h1 {
    color: red;
}
</style>
