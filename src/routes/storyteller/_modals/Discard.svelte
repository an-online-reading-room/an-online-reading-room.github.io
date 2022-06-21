<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function discard() {
        dispatch("discard");
    }

    function close() {
        dispatch("close");
    }
</script>

<p class="font-bold">This will undo all edits.</p>
<p>Are you sure?</p>
<div class="flex justify-between mt-3">
    <button class="btn-modal" on:click={discard}>Yes</button>
    <button class="btn-modal" on:click={close}>No</button>
</div>

<style lang="postcss">
    .btn-modal {
        @apply bg-primary text-accent font-display font-bold text-sm h-fit px-8 py-2;
    }
</style>