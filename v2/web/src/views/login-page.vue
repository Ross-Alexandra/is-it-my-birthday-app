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
.login-panel {
    input {
        margin-bottom: 10px;
    }
}
</style>
