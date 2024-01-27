<template>
    <panel-page
        v-if="verificationStatus === 'pending'" 
        class="verify-panel"
    >
        <h1>Verifying your email</h1>
        <p>Hold tight! We&apos;re just making everything is right.</p>
    </panel-page>

    <panel-page
        v-else-if="verificationStatus === 'error'" 
        class="verify-panel"
    >
        <h1>Error validating your email</h1>
        <p>
            Please try again later. If this error persists
            please try to login again to get a new link
        </p>
    </panel-page>

    <panel-page
        v-else-if="verificationStatus === 'success'" 
        class="verify-panel"
    >
        <h1>Email Verified!</h1>
        <p>You'll be redirected home momentarily</p>
    </panel-page>
</template>

<script setup lang="ts">
import PanelPage from '@/shared/panel-page.vue';
import { ref, onMounted } from 'vue';
import router from '@/router';
import { AuthApi } from '@/api/auth';

const verificationStatus = ref<'pending' | 'success' | 'error'>('pending');

onMounted(async () => {
    try {
        const response = await AuthApi.verifyEmail(router.currentRoute.value.query.v as string);
        if ('error' in response.data) {
            throw new Error(response.data.error);
        }

        verificationStatus.value = 'success';
        window.location.href = '/home';
    } catch {
        verificationStatus.value = 'error';
    }
});
</script>

<style lang='scss' scoped>
.verify-panel {
    max-width: 500px;
    padding: 25px;

    h1 {
        margin: 0px 0px 15px 0px;
    }

    p {
        margin: 0px;
    }
}
</style>
