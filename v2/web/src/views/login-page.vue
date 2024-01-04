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
            required
        />

        <button class="btn btn-primary">
            Rejoin the Celebration!
        </button>
    </panel-page>
</template>

<script setup lang="ts">
import PanelPage from '@/shared/panel-page.vue';
</script>

<style lang='scss' scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .login-panel {
        input {
            margin-bottom: 10px;
        }
    }
}

@media (max-width: $tablet-breakpoint) {
    .login-panel {
        
    }
}
</style>
