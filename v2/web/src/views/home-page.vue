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
                    <!-- Loader sourced from https://cssloaders.github.io/ -->
                    <span class="loader"></span>
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

<style scoped>
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

.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--primary-font-color);
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

</style>
