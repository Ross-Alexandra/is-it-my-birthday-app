<template>
    <hero-banner />
    <date-box />
    <div class="gap"/>
    <user-leaderboard />
</template>

<script setup lang="ts">
import DateBox from '@/apps/home/components/date-box.vue';
import HeroBanner from '@/apps/home/components/hero-banner.vue';
import UserLeaderboard from '@/apps/home/components/leaderboard/user-leaderboard.vue';
</script>

<style scoped>
.gap {
    height: 100px;
}
</style>
