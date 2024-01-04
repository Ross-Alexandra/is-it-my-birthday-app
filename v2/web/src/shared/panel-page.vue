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
        align-items: start;

        overflow: auto;
        width: max-content;

        padding: 10px 25px;

        max-height: 85vh;
        max-width: 95vw;

        background-color: var(--backup-transparent-background-color);
        backdrop-filter: blur(5px);
        border-radius: var(--border-radius);
    }
}

@media (max-width: $tablet-breakpoint) {
    .panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        align-items: start;

        overflow: auto;

        padding: 10px 25px;

        width: 95vw;
        min-height: 75svh;
        max-height: 95svh;
        
        background-color: var(--backup-transparent-background-color);
        backdrop-filter: blur(5px);
        border-radius: var(--border-radius);
    }
}
</style>
