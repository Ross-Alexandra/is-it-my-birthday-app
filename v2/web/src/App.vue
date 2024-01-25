<template>
    <router-view />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang='scss' scoped>
.auth-floater {
    position: fixed;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background-color: white;
}
</style>
