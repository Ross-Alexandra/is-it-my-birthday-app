<template>
    <hero-banner
        @open-dialog="openDialog"
    />
    <date-box />
    <div class="gap"/>
    <user-leaderboard />

    <dialog ref="dialog" class="dialog">
        <suspense>
            <template #default>
                <birthday-dialog
                    @close-dialog="closeDialog"
                />
            </template>

            <template #fallback>
                <div class="dialog-fallback">
                    <spinning-loader />
                </div>
            </template>
        </suspense>
    </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BirthdayDialog from '@/pages/home/components/birthday-dialog.vue';
import DateBox from '@/pages/home/components/date-box.vue';
import HeroBanner from '@/pages/home/components/hero-banner.vue';
import UserLeaderboard from '@/pages/home/components/leaderboard/user-leaderboard.vue';
import spinningLoader from '@/shared/spinning-loader.vue';

const dialog = ref<HTMLDialogElement | null>(null);

const openDialog = () => {
    dialog.value?.showModal();
    dialog.value?.addEventListener('click', closeDialog);

    document.body.style.overflow = 'hidden';
};

const closeDialog = (event?: MouseEvent) => {
    if (!event || event?.target === dialog.value) {
        dialog.value?.close();
        dialog.value?.removeEventListener('click', closeDialog);
        document.body.style.overflow = 'auto';
    }
};
</script>

<style lang="scss" scoped>
@import '@/theme.scss';

// Desktop Styling
@media (min-width: ($tablet-breakpoint + 1px)) {
    .gap {
        height: 100px;
    }

    .dialog {
        padding: 0px;

        min-height: 20vh;
        width: fit-content;
        height: fit-content;

        border: unset;
        border-radius: var(--border-radius);

        background-color: var(--backup-background-color);

        &::backdrop {
            background-color: rgba(0, 0, 0, 0.75);
            cursor: pointer;
        }
    }

    .dialog-fallback {
        display: grid;
        place-items: center;
        height: 25vh;
        width: 100%;
    }
}

@media (max-width: $tablet-breakpoint) {
    .dialog {
        padding: 0px;

        min-height: 20vh;
        width: 95vw;
        height: fit-content;

        border: unset;
        border-radius: var(--border-radius);

        background-color: var(--backup-background-color);

        &::backdrop {
            background-color: rgba(0, 0, 0, 0.75);
            cursor: pointer;
        }
    }
}
</style>
