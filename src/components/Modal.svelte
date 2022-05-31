<script>
    import { createEventDispatcher } from "svelte";

    export let isOpenModal;

    const dispatch = createEventDispatcher();

    function closeModal() {
        isOpenModal = false;
        dispatch("closeModal", { isOpenModal });
    }
</script>

{#if isOpenModal}
<div
    id="background"
    class="fixed h-screen w-screen z-10 left-0 top-0"
    
    on:click={closeModal}>
    <div
        id="modal"
        class="fixed w-full px-6 top-1/2 left-1/2 z-20 "
        >
        <div class="font-text text-left text-sm bg-accent text-primary py-4 pl-4 pr-12 rounded shadow-xl">
            <slot></slot>
        </div>

        <button class="fixed top-3 right-9 w-6 h-6 focus:outline-none ml-auto text-primary" on:click={closeModal}>
            <svg class="stroke-current" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19.25" stroke-width="1.5"/>
            <path d="M14 25.3137L25.3137 14" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M14.3433 14.3431L25.657 25.6568" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M14 25.3137L25.3137 14" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </button>
    </div>
</div>
{/if}

<style>
    #background {
        
    }

    #modal {
        
        transform: translate(-50%, -50%);
    }
</style>
