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
    export let status;
    export let message;
</script>

<div class="w-4/5 break-words text-center py-24 mx-auto">
    <h1 class="text-9xl">{status}</h1>
    <h2 class="text-4xl">{message}</h2>
</div>
