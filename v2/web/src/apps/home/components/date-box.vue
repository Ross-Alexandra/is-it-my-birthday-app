<template>
    <div class="date-box">
        <div class="date-box__date">
            <p>May</p>
            <p class="focus">12th</p>
        </div>
        <div class="date-box__other">
            <p class="focus">234th</p>
            <p>Day</p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .date-box {
        display: grid;
        grid-template-columns: 1fr 1fr;

        margin: 0px auto 0px auto;
        width: min-content;
        border-radius: 15px;
        overflow: hidden;

        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

        @media (max-width: 900px) {
            display: none;
        }

        p {
            position: relative;
            font-size: 2.5rem;
            font-weight: 800;
            margin: 0px 10px;
        }

        &__date,
        &__other {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-evenly;

            width: 100%;
            height: 100%;
            padding: 10px 70px;
        }

        &__date {
            --focus-background-color: var(--secondary-color);
            background-color: var(--primary-color);
        }

        &__other {
            --focus-background-color: var(--primary-color);
            background-color: var(--secondary-color);
        }

        p.focus {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 5ch;
            padding: 10px;
            aspect-ratio: 1;
            border-radius: 50%;
            background-color: var(--focus-background-color);
            text-align: center;
            box-shadow: inset 0 -4px 5px -3px rgba(0, 0, 0, 0.3); /* Inner shadow effect */
        }
    }
</style>
