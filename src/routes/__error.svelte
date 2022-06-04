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
    import Background from "$components/utils/Background.svelte";
    export let status;
    export let message;
</script>

<div class="max-w-screen-sm h-full mx-auto shadow-2xl ">
    <Background>
        <div class="w-4/5 break-words text-center py-24 mx-auto">
            <h1 class="text-9xl">{status}</h1>
            <h2 class="text-4xl">{message}</h2>
        </div>
    </Background>
</div>
