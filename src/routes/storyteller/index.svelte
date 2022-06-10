<script>
    import * as api from "$lib/api.js";
    import { onMount } from "svelte";
    import { user } from "$stores/user.js";
    import Delete from "$components/icons/Delete.svelte";
    import Modal from "$components/utils/Modal.svelte";

    let stories = [];
    let query = "";
    let isOpenModal = false;
    let deletingStory;
    onMount(getStories);

    async function getStories() {
        //console.log($user.jwt)
        try {
            const userData = await api.get("api/users/me", $user.jwt);
            stories = userData?.stories.reverse();
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteStory(id) {
        await api.del(`api/stories/${id}`, $user.jwt);
        getStories();
        closeDeleteModal();
    }

    function openDeleteModal(id) {
        isOpenModal = true;
        deletingStory = id;
    }
    function closeDeleteModal() {
        isOpenModal = false;
    }

    const search = (e) => {
        query = query.toLowerCase();
        stories = stories.filter((story) => {
            return (
                story.title.toLowerCase().includes(query) ||
                story.location.toLowerCase().includes(query)
            );
        });
        //query = "";
    };
</script>

<div
    class="overflow-y-auto flex-column gap-y-2 px-8 py-3.5 pb-12 border-t border-contrast">
    <a href="/storyteller/editor">
        <div class="btn">Create a new story</div>
    </a>
    <a href="/prompts">
        <div class="btn">Prompts</div>
    </a>

    <div
        class="flex flex-row justify-between 
    w-full gap-x-base divide-x
    border-2 border-contrast">
        <input
            type="search"
            name="search-query"
            placeholder="Search for a story"
            class="flex-1 py-1 bg-primary text-sm px-2 focus:outline-none placeholder:text-contrast"
            bind:value={query} />
        <button
            class="w-8 h-8 bg-primary focus:outline-none stroke-contrast"
            on:click={search}>
            <svg
                class="stroke-current"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="19" cy="19" r="7" stroke-width="1.5" />
                <path
                    d="M28 28L25 25"
                    stroke-width="1.5"
                    stroke-linecap="round" />
            </svg>
        </button>
    </div>
    {#if stories}
        {#each stories as story}
            <a
                href="storyteller/editor?story={story.id}"
                class="relative flex flex-col gap-y-3 border-2 border-contrast px-3.5 py-2 font-display text-contrast">
                <button
                    on:click|preventDefault={openDeleteModal(story.id)}
                    class="absolute top-3 right-2">
                    <Delete />
                </button>
                <p class="text-base font-medium">{story?.title ?? "Untitled"}</p>
                <p class="text-sm font-text">{story?.location ?? "No location"}</p>
                <p class="text-sm font-text">{story?.description ?? "No description"}</p>
            </a>
            
        {/each}
    {/if}
</div>
<Modal {isOpenModal} showCloseButton={false}>
    <p>Are you sure you want to delete this story?</p>
    <div class="flex justify-around mt-6">
        <button
            class="btn btn-modal"
            on:click={deleteStory(deletingStory)}>Yes</button>
        <button class="btn btn-modal" on:click={closeDeleteModal}
            >No</button>
    </div>
</Modal>

<style lang="postcss">
    .btn {
        @apply bg-accent text-primary text-sm px-4 py-3;
    }
    .btn-modal {
        @apply w-16 h-fit border border-primary px-4 py-2;
    }
</style>
