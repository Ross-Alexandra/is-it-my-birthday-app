<template>
    <panel-page class="legal-panel">
        <h2>Terms of Service</h2>
        <p>
            When you create an account with us, you are acknowledging and agreeing
            that we reserve the right to terminate your account at our discretion,
            for any reason deemed appropriate. The purpose of an account is solely
            to enhance your user experience. Any misuse, such as actions that compromise
            the platform's functionality or negatively affect the experience of
            others, will result in immediate termination and deletion of your account.
            While our service is provided free of charge for your enjoyment, activities
            that incur disproportionate costs or strain resources are grounds for
            termination. This list is not exhaustive; termination can occur for
            reasons not specified herein.
        </p>

        <div class="divider" />

        <h2>Privacy Policy</h2>
        <p>
            Our collection of your data is limited to what is necessary for functionality
            and enhancing your experience:
        </p>
        <ul>
            <li>Displaying your name on the leaderboard, if relevant.</li>
            <li>Tracking your birthday for personalized use.</li>
        </ul>
        <p>
            We stand firm in our commitment to not commercialize your personal data.
            Specifically, we will not:
        </p>
        <ul>
            <li>Sell or trade your information.</li>
            <li>Send marketing communications without your explicit consent.</li>
            <li>Utilize your data for anything beyond the operation and improvement of the site.</li>
        </ul>
        <p>
            Should you decide to retract your data, please contact
            <a href="mailto:ross-alexandra@outlook.com">ross-alexandra@outlook.com</a>
            from your registered email address. Verification of ownership is required
            for such requests to ensure secure and rightful data management.
        </p>
    </panel-page>
</template>

<script setup lang="ts">
import PanelPage from '@/shared/panel-page.vue';
</script>

<style lang='scss' scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .legal-panel {
        max-height: 100svh;
        width: fit-content;
        min-width: 75vw;
        border-radius: 0px;

        display: block;
    }
}

@media (max-width: $tablet-breakpoint) {
}
</style>
