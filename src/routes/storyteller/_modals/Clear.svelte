<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function clear() {
        dispatch("clear");
    }

    function close() {
        dispatch("close");
    }
</script>
<p class="font-bold pr-5">Are you sure you want to start over?</p>
<p>We’ll miss it!</p>
<div class="flex justify-between mt-3">
    <button class="btn-modal" on:click={clear}>Yes</button>
    <button class="btn-modal" on:click={close}>No</button>
</div>


<style lang="postcss">
    .btn-modal {
        @apply bg-primary text-accent font-display font-bold text-sm h-fit px-8 py-2;
    }
</style>