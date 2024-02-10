<template>
    <login-form
        v-if="!loginAttempted && !isVerificationRoute"
        @login="login"
    />
    <login-waiting-email v-else-if="!isVerificationRoute" />
    <verify-login v-else />
</template>

<script setup lang="ts">
import LoginForm from '@/pages/login/login-form.vue';
import VerifyLogin from '@/pages/login/verify-login.vue';
import LoginWaitingEmail from '@/pages/login/login-waiting-email.vue';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AuthApi } from '@/api/auth';

const router = useRouter();
const route = useRoute();
const isVerificationRoute = computed(() => !!route?.query?.v);
const loginAttempted = ref(false);

async function login(email: string) {
    try {
        await AuthApi.login(email);
    } finally {
        // If we're on mobile, then we should redirect to the verify page,
        // otherwise let the user know that they should check their email.
        if (process.env.VUE_APP_IS_MOBILE) {
            router.push({ name: 'Verify' });
        } else {
            loginAttempted.value = true;
        }
    }
}
</script>

