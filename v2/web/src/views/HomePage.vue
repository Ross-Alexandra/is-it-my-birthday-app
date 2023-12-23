<template>
    <hero-banner />
    <date-box />
    <div class="separator"/>
    <user-leaderboard />
</template>

<script setup lang="ts">
import DateBox from '@/apps/home/components/date-box.vue';
import HeroBanner from '@/apps/home/components/hero-banner.vue';
import UserLeaderboard from '@/apps/home/components/user-leaderboard.vue';
</script>

<style scoped>
.separator {
    height: 100px;
}
</style>
