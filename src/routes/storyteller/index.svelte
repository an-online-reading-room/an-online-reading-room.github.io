<script>
    import * as api from "$lib/api.js";
    import { onMount } from "svelte";
    import { user } from "$stores/user.js";
    import Delete from "$components/icons/Delete.svelte";
    import Modal from "$components/utils/Modal.svelte";

    let stories = [];
    let isOpenModal = false;
    onMount(getStories);

    async function getStories() {
        //console.log($user.jwt)
        try {
            const userData = await api.get("api/users/me", $user.jwt);
            stories = userData?.stories;
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteStory(id) {
        await api.del(`api/stories/${id}`, $user.jwt);
        getStories();
        closeDeleteModal();
    }

    function openDeleteModal() {
        isOpenModal = true;
    }
    function closeDeleteModal() {
        isOpenModal = false;
    }
</script>

<div
    class="overflow-y-auto flex-column gap-y-2 px-8 py-3.5 pb-12 border-t border-contrast">
    <a href="/storyteller/editor">
        <div class="btn">Create a new story</div>
    </a>
    <a href="/prompts">
        <div class="btn">Prompts</div>
    </a>
    {#if stories}
        {#each stories as story}
            <a
                href="storyteller/editor?story={story.id}"
                class="relative flex flex-col gap-y-3 border-2 border-contrast px-3.5 py-2 font-display text-contrast">
                <button on:click|preventDefault={openDeleteModal} class="absolute top-3 right-2">
                    <Delete />
                </button>
                <p class="text-base font-medium">{story.title}</p>
                <p class="text-sm font-text">{story.location}</p>
                <p class="text-sm font-text">{story.description}</p>
            </a>
            <Modal {isOpenModal} showCloseButton={false}>
                <p>Are you sure you want to delete this story?</p>
                <div class="flex justify-around mt-6">
                <button class="btn btn-modal" on:click={deleteStory(story.id)}>Yes</button>
                <button class="btn btn-modal" on:click={closeDeleteModal}>No</button>
            </div>

            </Modal>
        {/each}
    {/if}
</div>

<style lang="postcss">
    .btn {
        @apply bg-accent text-primary text-sm px-4 py-3;
    }
    .btn-modal {
        @apply w-16 h-fit border border-primary px-4 py-2;
    }
</style>
