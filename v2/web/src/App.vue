<template>
    <router-view />

    <div
        v-if="isDevelopment"
        class="auth-floater"
    >
        <p>User ID:</p>
        <p>{{ authId }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'; 
import { RouterView } from 'vue-router';
import { AuthApi } from './apis';

const isDevelopment = process.env?.VUE_APP_ENV === 'development';
const authId = ref('fetching...');
onMounted(async () => {
    if (isDevelopment) {
        const response = await AuthApi.get('/auth-test');
        if (response.data?.user_id) {
            authId.value = response.data.user_id;
        } else {
            authId.value = 'not logged in';
        }
    }
})
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
