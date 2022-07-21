<script>
    import * as api from "$lib/api.js";
    import { onMount } from "svelte";
    import { user } from "$stores/user";
    import DeleteIcon from "$components/icons/DeleteIcon.svelte";
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
            const userData = await api.get("api/users/bookmarks", $user.jwt);
            stories = userData?.bookmarks.reverse();
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteBookmark(id) {
        await api.del(`api/users/bookmarks/${id}`, $user.jwt);
        getStories();
        //closeDeleteModal();
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
    <p class="font-display font-bold text-4xl">Bookmarks</p>

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
                    <button
                        on:click|preventDefault={() =>
                            deleteBookmark(story.id)}>
                        <DeleteIcon />
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


<style lang="postcss">
    .btn {
        @apply bg-accent text-primary text-sm px-4 py-3;
    }
    .btn-modal {
        @apply bg-primary text-accent font-display font-bold text-sm h-fit px-8 py-2;
    }
</style>
