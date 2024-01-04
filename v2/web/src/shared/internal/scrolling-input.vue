<template>
    <div class="scrolling-input-wrapper"
        @wheel="scroll"
        @touchstart="swipeStart"
        @touchmove="swipeMove"
    >
        <h4
            class="fade-1"
            @click="setNextIndex(currentIndex - 1)"
        >
            {{ options.at(currentIndex - 1) }}
        </h4>
        <h3
            ref="primary"
            class="scrolling-input"
        >
            {{ options.at(currentIndex) }}
        </h3>
        <h4
            class="fade-1"
            @click="setNextIndex(currentIndex + 1)"
        >
            {{ options.at((currentIndex + 1) % options.length) }}
        </h4>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const emit = defineEmits(['change']);
const props = defineProps<{
    initialIndex: number;
    options: string[];
}>();

const currentIndex = ref(props.initialIndex);

function setNextIndex(nextIndex: number) {
    if (nextIndex >= 0 && nextIndex < props.options.length) {
        currentIndex.value = nextIndex;
        emit('change', props.options[nextIndex]);
    } else if (nextIndex < 0) {
        currentIndex.value = props.options.length - nextIndex - 2;
        emit('change', props.options[currentIndex.value]);
    } else if (nextIndex >= props.options.length) {
        currentIndex.value = nextIndex - props.options.length;
        emit('change', props.options[currentIndex.value]);
    }
}

const scroll = (event: WheelEvent) => {
    event.preventDefault();

    const delta = Math.sign(event.deltaY);
    const nextIndex = currentIndex.value + delta;

    setNextIndex(nextIndex);
};

const primary = ref<HTMLElement | null>(null);
const swipeDeltaThreshold = ref(100);
onMounted(() => {
    swipeDeltaThreshold.value = primary.value?.clientHeight || 100;
});

const swipeDiff = ref(0);
const swipeStartAt = ref(0);
function swipeStart(event: TouchEvent) {
    swipeStartAt.value = event.touches[0].clientY;
}

function swipeMove(event: TouchEvent) {
    event.preventDefault();

    const delta = swipeStartAt.value - event.touches[0].clientY;
    swipeDiff.value += delta;

    if (Math.abs(swipeDiff.value) > swipeDeltaThreshold.value) {
        const nextIndex = currentIndex.value + Math.sign(swipeDiff.value);
        swipeDiff.value = 0;
        swipeStartAt.value = event.touches[0].clientY;

        setNextIndex(nextIndex);
    }
}

</script>

<style lang="scss" scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .scrolling-input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        > * {
            user-select: none;
            font-weight: 800;
            cursor: pointer;
        }
    }

    .scrolling-input {
        cursor: default;
        font-size: 2rem;

        margin: 0px;
        padding: 0px;
    }

    .fade-1 {
        opacity: .75;
        filter: blur(0.75px);
        margin: 0px;
    }

    .fade-2 {
        opacity: 0.25;
        filter: blur(2px);
        margin: 0px;
    }
}

@media (max-width: $tablet-breakpoint) {
    .scrolling-input-wrapper {
        display: flex;
        flex-direction: column;
    }

        .scrolling-input {
        cursor: default;
        font-size: 1.5rem;

        margin: 10px 0px;
        padding: 0px;
    }

    .fade-1 {
        opacity: .75;
        filter: blur(0.75px);
        margin: 0px;
    }

    .fade-2 {
        opacity: 0.25;
        filter: blur(2px);
        margin: 0px;
    }
}
</style>
