<script>
    import CloseButton from "$components/icons/CloseButton.svelte";
    export let isOpenModal;
    export let showCloseButton;
    const closeModal = () => {
        isOpenModal = false;
    };
</script>

{#if isOpenModal}
    <div class="fixed h-screen w-screen z-20 left-0 top-0 bg-slate-gray-500">
        <div
            class="fixed w-10/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <div
                class="font-text text-left text-sm bg-accent text-primary px-4 py-5 rounded shadow-2xl">
                {#if showCloseButton}
                    <button
                        class="absolute top-3 right-2"
                        on:click={closeModal}>
                        <CloseButton />
                    </button>
                {/if}
                <slot />
            </div>
        </div>
    </div>
{/if}
