<template>
    <panel-page class="login-panel">
        <h1>Welcome back to the pre-party!</h1>
        <img 
            src="/assets/login.png"
            width="200px"
            height="200px"
            alt="register"
        />

        <input
            type="email"
            name="email"
            placeholder="Email"
            v-model="email"
            @keyup.enter="login"
        />

        <button
            @click="login" 
            class="btn btn-primary"
        >
            Rejoin the Celebration!
        </button>
    </panel-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PanelPage from '@/shared/panel-page.vue';

const email = ref('');
const emit = defineEmits(['login']);

function login() {
    emit('login', email.value);
}
</script>

<style lang='scss' scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .login-panel {
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            margin-bottom: 10px;
        }
    }
}

@media (max-width: $tablet-breakpoint) {
    .login-panel {
        display: flex;
        flex-direction: column;
        align-items: center;

        min-height: 0px;

        input {
            margin-bottom: 10px;
        }
    }
}
</style>
