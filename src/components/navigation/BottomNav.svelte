<script>
    export let faded = false;
</script>
<div class="fixed inset-x-0 bottom-0 z-10 flex-column gap-y-2 bg-primary">
    {#if !faded}
    <slot name="editor-extras"></slot>
    {/if}
    <div class="flex h-11 bg-accent text-primary" class:opacity-75={faded}>
        <slot name="bottom-bar"></slot>
    </div>
</div>