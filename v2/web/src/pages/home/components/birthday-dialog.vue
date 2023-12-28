<template>
    <div class="dialog-content">
        <div class="dialog-header">
            <h2>Is today your confetti moment?</h2>
        </div>

        <div class="dialog-body">
            <div
                v-if="!birthday"
                class="birthday-input"
            >
                <p>Enter your birthday to find out!</p>
                <input
                    type="date"
                    v-model="birthday"
                />
            </div>
        </div>

        <div class="dialog-footer">
            <button class="btn btn-primary">Yes</button>
            <button class="btn btn-secondary">No</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getBirthday } from '@/utils/getBirthday';

const birthday = await getBirthday();
</script>

<style lang="scss" scoped>
    .dialog-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 20px;
        width: fit-content;
        height: fit-content;
    }
</style>
