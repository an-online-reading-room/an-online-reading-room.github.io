<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export function load({ error, status }) {
        return {
            props: {
                status,
                message: error.message,
            },
        };
    }
</script>

<script>
import Header from "$components/Header.svelte";

    export let status;
    export let message;

    console.error(`${status}: ${message}`)
</script>

<Header />
<main class="px-6 pt-2 font-text">
{#if status === 404}
<p>We have all been lost sometimes, find your way <a class="underline underline-offset-1" href="/">back</a>.</p>
{:else} 
    <p>This site is under heavy development so things so wrong some (a lot of) times.</p>
    <p>But we are working on it!</p>
    <p>Find you way <a class="underline underline-offset-1" href="/">back</a>.</p>
{/if}
</main>
        

