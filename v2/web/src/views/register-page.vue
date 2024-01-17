<template>
    <register-form
        v-if="!registerSuccess" 
        @signup="signup"
        :register-error="registerError"
    />

    <register-waiting-email v-else />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RegisterForm from '@/pages/register/register-form.vue';
import registerWaitingEmail from '@/pages/register/register-waiting-email.vue';
import { AuthApi } from '@/apis';

const registerSuccess = ref(false);
const registerError = ref<string | null>(null);

const signup = async (data: any) => {
    try {
        const response = await AuthApi.post('/register', data);
        if ('error' in response.data) {
            switch (response.data.error) {
                case 'email_already_exists':
                    registerError.value = 'This email is already registered. Log in instead.'
                    break;
                default:
                    registerError.value = 'Something went wrong. Please try again later.'
                    break;
            }

            return;
        }

        registerSuccess.value = true;        
    } catch (error) {
        registerError.value = 'Something went wrong. Please try again later.'
    }
}
</script>
