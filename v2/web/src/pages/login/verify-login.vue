<template>
    <panel-page
        v-if="verificationStatus === 'querying'" 
        class="verify-panel"
    >
        <h1>Please enter the code we emailed you!</h1>
        <input
            type="text"
            name="code"
            placeholder="Verification Code"
            v-model="code"
        />
        <button
            class="btn btn-primary"
            @click="() => verifyEmail(code)"    
        >
            Start My Streak!
        </button>
    </panel-page>

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

const currentRoute = router.currentRoute.value.name;
const verificationStatus = ref<'querying' | 'pending' | 'success' | 'error'>(currentRoute === 'Verify' ? 'querying' : 'pending');

const code = ref('');
async function verifyEmail(verificationCode: string) {
    try {
        const response = await AuthApi.verifyEmail(verificationCode);
        if ('error' in response.data) {
            throw new Error(response.data.error);
        }

        verificationStatus.value = 'success';
        window.location.href = '/home';
    } catch (e) {
        verificationStatus.value = 'error';
    }
}

if (currentRoute !== 'Verify') {
    onMounted(() => verifyEmail(router.currentRoute.value.query.v as string));
}
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

    button {
        margin-top: 15px;
    }
}
</style>
