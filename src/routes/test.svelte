<script>
    import { user } from "$stores/user";
    import { beforeNavigate } from "$app/navigation";
    import Modal from "$components/Modal.svelte";

    function checkLogin() {
        if ($user.jwt) {
            goto("/storyteller");
        } else {
            openModal();
        }
    }

    let isOpenModal = false;

    function openModal() {
        isOpenModal = true;
    }

    function closeModal() {
        isOpenModal = false;
    }
</script>

<div>
    <div class="flex justify-evenly px-8 py-2">
        <a href="/stories">
            <button
                class="font-display text-sm px-4 py-2 bg-contrast text-primary">
                Listener
            </button>
        </a>
        <a href="/storyteller" on:click|preventDefault={checkLogin}>
            <button
                class="font-display text-sm px-4 py-2 bg-contrast text-primary">
                Storyteller
            </button>
        </a>
    </div>
    <Modal isOpenModal={isOpenModal} on:closeModal={closeModal} />

</div>
