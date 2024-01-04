<template>
    <div
        class="birthday-input"
        title="psst, you can scroll me!"
    >
        <scrolling-input
            :initialIndex="5"
            :options="(months as unknown as string[])"
            @change="(nextValue: typeof months[number]) => emit('change:month', nextValue)"
        />

        <scrolling-input
            :initialIndex="14"
            :options="Array.from({ length: 31 }, (_, i) => i + 1).map(day => day.toString().padStart(2, '0'))"
            @change="(nextValue: string) => emit('change:day', nextValue)"
        />
    </div>
</template>

<script lang="ts">
export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] as const;

export function getMonthNumber(month: typeof months[number]) {
    return months.indexOf(month) + 1;
}

export type Months = typeof months[number];
</script>

<script setup lang="ts">
import ScrollingInput from '@/shared/internal/scrolling-input.vue';

const emit = defineEmits(['change:month', 'change:day']);
</script>

<style lang="scss" scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .birthday-input {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 15px;

        & > *:first-child {
            align-items: flex-end;
        }

        & > *:last-child {
            align-items: flex-start;
        }
    }
}

@media (max-width: $tablet-breakpoint) {
}
</style>
