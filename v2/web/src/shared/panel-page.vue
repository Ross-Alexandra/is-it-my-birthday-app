<template>
    <div class="panel">
        <slot />
    </div>
</template>

<style lang='scss' scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0px auto;

        padding: 25px;
        width: fit-content;
        height: fit-content;

        max-width: 50vw;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            background-color: var(--backup-background-color);
            opacity: 0.75;
            backdrop-filter: blur(5px);
            border-radius: var(--border-radius);

            z-index: -1;
        }
    }
}

@media (max-width: $tablet-breakpoint) {
}
</style>
