<template>
    <div class="tabbed-table" :data-current-tab="props.currentTab">
        <div class="tabbed-table__header">
            <div
                class="tab"
                data-tab="streak"
                @click="emit('update:currentTab', 'streak')"
                title="Count of consecutive cakeless days"
            >
                <h2>The almost birthday hero</h2>
            </div>
            <div 
                class="tab"
                data-tab="birthday-streak"
                @click="emit('update:currentTab', 'birthday-streak')"
                title="Tally of consecutive birthdays checked"
            >
                <h2>The most birthday-ful</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    currentTab: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['update:currentTab']);
</script>

<style lang="scss" scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {

    .tabbed-table .tabbed-table__header {
        --grid-gap: 35px;

        position: relative;
        display: grid;
        grid-gap: 35px;
        grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
        place-items: center;
        z-index: 0;

        margin-bottom: 20px;

        &::after {
            position: absolute;

            content: '';
            display: block;

            height: 3px;
            bottom: 0px;

            background-color: var(--secondary-color);
            z-index: -1;
            border-radius: var(--border-radius);

            transition: left 0.15s ease-in-out;
        }
    }

    .tabbed-table[data-current-tab='streak'] .tabbed-table__header::after {
        left: 0px;
        width: calc(50% - var(--grid-gap) / 2);
    }

    .tabbed-table[data-current-tab='birthday-streak'] .tabbed-table__header::after {
        left: calc(50%);
        width: 50%;
    }

    .tabbed-table .tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100%;
        height: 100%;

        padding: 0px 20px;
    }

    .tabbed-table .tab h2 {
        font-size: 2rem;
        text-align: center;
        max-width: 600px;
        margin: unset;
        user-select: none;
    }
}

@media (max-width: $tablet-breakpoint) {
    .tabbed-table[data-current-tab='birthday-streak'] .tab[data-tab='streak'] {
        opacity: 0.5;
    }

    .tabbed-table[data-current-tab='birthday-streak'] .tab[data-tab='birthday-streak'] {
        &::after {
            transform: scaleX(1);
        }
    }

    .tabbed-table[data-current-tab='streak'] .tab[data-tab='birthday-streak'] {
        opacity: 0.5;
    }

    .tabbed-table[data-current-tab='streak'] .tab[data-tab='streak'] {
        &::after {
            transform: scaleX(1);
        }
    }

    .tabbed-table .tab {
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 100%;

        font-size: 1.1rem;
        font-weight: 800;
        padding: 0px 20px;

        transition: opacity 0.15s ease-in-out;

        &::after {
            position: absolute;
            content: '';
            display: block;

            width: calc(100% - 40px);
            height: 3px;
            bottom: 0px;

            background-color: var(--secondary-color);
            z-index: 0;
            border-radius: var(--border-radius);

            transform: scaleX(0);
            transition: transform 0.15s ease-in-out;
        }
    }
}
</style>
