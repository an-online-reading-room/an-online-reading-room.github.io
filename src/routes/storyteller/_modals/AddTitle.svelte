<script>
    import { createEventDispatcher } from "svelte";
    import CloseButton from "$components/icons/CloseButton.svelte";

    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }
</script>
<p class="font-bold pr-4">Please add a title to your story</p>
<button class="absolute top-3 right-2" on:click={close}>
    <CloseButton/>
</button>