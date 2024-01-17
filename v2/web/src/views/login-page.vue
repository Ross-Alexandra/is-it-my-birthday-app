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
import { useRoute } from 'vue-router';
import { AuthApi } from '@/apis';

const route = useRoute();
const isVerificationRoute = computed(() => !!route?.query?.v);
const loginAttempted = ref(false);

function login(email: string) {
    AuthApi.post('/login', { email });
    loginAttempted.value = true;
}
</script>

