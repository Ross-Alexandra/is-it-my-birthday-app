<template>
    <panel-page class="register-waiting-email-panel">
        <div class="register-waiting-email">
            <div class="register-waiting-email__title">
                <h1>Check your email</h1>
            </div>

            <div class="register-waiting-email__content">
                <p>
                    We've sent you an email with a link to activate your account,
                    Please follow the link to activate your account.
                    You may close this tab at any time.
            </p>
            </div>
        </div>
    </panel-page>
</template>

<script setup lang="ts">
import PanelPage from '@/shared/panel-page.vue';
</script>

<style lang="scss" scoped>
.register-waiting-email-panel {
    max-width: 500px;

    padding: 50px;
}
.register-waiting-email {
    h1 {
        margin: 0px 0px 15px 0px;
    }

    p {
        margin: 0px;
    }
}
</style>
