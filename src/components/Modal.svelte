<script>
    import { createEventDispatcher } from "svelte";

    export let isOpenModal;

    const dispatch = createEventDispatcher();

    function closeModal() {
        isOpenModal = false;
        dispatch("closeModal", { isOpenModal });
    }
</script>

<div
    id="background"
    class="fixed h-screen w-screen z-10 left-0 top-0"
    style="--display: {isOpenModal ? 'block' : 'none'};"
    on:click={closeModal}>
    <div
        id="modal"
        class="fixed w-10/12 top-1/2 left-1/2 z-20 "
        style="--display: {isOpenModal ? 'block' : 'none'};">
        <div class="font-text text-left text-sm bg-accent text-primary p-4 rounded shadow-xl">
            <p class="font-bold mb-2">Tell us your story!</p>
            <p>
                Please <a class="font-bold underline" href="/auth/login"
                    >log in</a> to use this feature.
            </p>
            <p>Worried about what story to share? Check out our prompts.</p>
        </div>
    </div>
</div>

<style>
    #background {
        display: var(--display);
    }

    #modal {
        display: var(--display);
        transform: translate(-50%, -50%);
    }
</style>
