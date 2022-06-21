<script>
    import * as api from "$lib/api.js";
    import { onMount } from "svelte";
    import { user } from "$stores/user";
    import Delete from "$components/icons/Delete.svelte";
    import Modal from "$components/utils/Modal.svelte";
import SearchIcon from "$components/icons/SearchIcon.svelte";

    let stories = [];

    $: searchStories = stories;

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
        searchStories = stories.filter((story) => {
            return (
                story.title.toLowerCase().includes(query) ||
                story.location.toLowerCase().includes(query)
            );
        });
        //query = "";
    };
    $: search(query);
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
            <SearchIcon />
        </button>
    </div>
    {#if stories}
        {#each searchStories as story}
            <a
                href="storyteller/editor?story={story.id}"
                class="relative flex flex-col gap-y-3 border-2 border-contrast px-3.5 py-2 font-display text-contrast">
                <div class="inline-flex items-center absolute top-2 right-2">
                    <span class="italic text-xs px-2"
                        >{story.publishedAt ? (story.draft ? "published | draft" : "published") : "draft"}</span>
                    <button on:click|preventDefault={() => openDeleteModal(story.id)}>
                        <Delete />
                    </button>
                </div>

                <p class="text-base font-medium">
                    {story.title !== "" ? story.title : "Untitled"}
                </p>
                <p class="text-sm font-text">
                    {story.location !== "" ? story.location : "No location"}
                </p>
                <p class="text-sm font-text">
                    {story.description !== ""
                        ? story.description
                        : "No description"}
                </p>
            </a>
        {/each}
    {/if}
</div>
<Modal {isOpenModal} showCloseButton={false}>
    <p class="font-bold"> Are you sure you want to delete your story?</p>
    <p>We’ll miss it!</p>
    <div class="flex justify-between mt-3">
        <button class="btn-modal" on:click={() => deleteStory(deletingStory)}
            >Yes</button>
        <button class="btn-modal" on:click={closeDeleteModal}>No</button>
    </div>
</Modal>

<style lang="postcss">
    .btn {
        @apply bg-accent text-primary text-sm px-4 py-3;
    }
    .btn-modal {
        @apply bg-primary text-accent font-display font-bold text-sm h-fit px-8 py-2;
    }
</style>
