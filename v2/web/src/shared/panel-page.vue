<template>
    <div class="panel">
        <div class="panel-inner">
            <slot />
        </div>
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

        max-width: 75vw;
        max-height: 95vh;

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

    .panel-inner {
        height: 100%;
        overflow: auto;

        padding: 25px;
    }
}

@media (max-width: $tablet-breakpoint) {
    .panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        overflow: auto;

        display: flex;
        flex-direction: column;
        align-items: start;

        width: 95vw;
        height: 95svh;

        &::after {
            content: '';
            position: fixed;
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

    .panel-inner {
        height: 100%;
        overflow: auto;

        padding: 25px;
    }
}
</style>
