<template>
    <div class="hero">
        <div class="hero-image">
            <img src="/assets/party-man.png" alt="Party Man" />
        </div>

        <div class="hero-content">
            <h1>Every day could be a party!</h1>
            <h2>But is today your confetti moment?</h2>
            <div class="buttons">
                <button class="btn btn-primary">Find out Now!</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .hero {
        display: grid;
        grid-template-columns: 1fr 1fr;

        margin: 10vh;
    }

    .hero h1 {
        font-size: 4rem;
        max-width: 600px;
        font-weight: 800;

        margin-bottom: 0rem;
    }

    .hero h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    .hero .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .hero .buttons .btn {
        font-size: 1.5rem;
        padding: 1rem 2rem;
    }

    .hero .hero-image {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
    }

    .hero .hero-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
</style>
