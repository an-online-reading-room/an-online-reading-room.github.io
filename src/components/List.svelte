<script>
	import storyList from '$stores/storyList.js';
	import { theme } from '$stores/theme.js';
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import SearchIcon from './icons/SearchIcon.svelte';
import mapStore from '$stores/mapStore';
  
	const dispatch = createEventDispatcher()

	const visitStory = (id) => {
		dispatch('visit', { story: id })
	};

    let listItems,
        filteredListItems,
        loading = true,
        noMoreData = false;
    let query = "";

    export let listStore;
    listStore.fetchNextPage();
    const listStoreUnsubscribe = listStore.subscribe((value) => {
        loading = value.loading;
        noMoreData = value.noMoreData;
        listItems = value.data;
        filteredListItems = listItems;
    });
    onDestroy(() => listStoreUnsubscribe);

    const search = (e) => {
        query = query.toLowerCase();
        filteredListItems = listItems.filter((story) => {
            return (
                story.title.toLowerCase().includes(query) ||
                story.username.toLowerCase().includes(query) ||
                story.location.toLowerCase().includes(query)
            );
        });
        query = "";
    };
</script>

<main class="flex flex-col align-items-center gap-y-4 px-6 pt-6 pb-10 overflow-y-scroll text-contrast min-h-full pb-40">
	<div
		class="flex flex-row justify-between 
	w-full gap-x-base divide-x
	border border-contrast"
	>
		<input
			type="search"
			name="search-query"
			placeholder="Search for a story/location/username"
			class="flex-1 py-1 bg-primary text-sm px-2 focus:outline-none placeholder:text-contrast"
			bind:value={query}
		/>
		<button class="w-8 h-8 bg-primary focus:outline-none stroke-contrast" on:click={search}>
			<SearchIcon />
		</button>
	</div>

    <div class="flex flex-col gap-y-4">
        {#if loading}
            <video src="/img/loading-{$theme}.webm" autoplay loop muted />
        {:else if filteredListItems.length > 0}
            {#each filteredListItems as story}
                <div>
                    <a
                        href="/lite/{story.slug}"
                        on:click={() => visitStory(story.id)}>
                        <div
                            class="px-3 py-3 w-full 
                            border border-contrast border-1
                            text-left font-text
                            inline-flex flex-col gap-y-2
                            {$mapStore.stories.includes(story.id) 
                                ? 'bg-story-accent text-menu-accent'
                                : 'bg-primary'}">
                            <div class="text-base font-medium font-display">
                                <h1>{story.title}</h1>
                            </div>
                            <div class="text-sm">
                                <p>{story.username}</p>
                            </div>
                            <div class="text-sm">
                                <p>{story.location}</p>
                            </div>
                            <div class="text-sm">
                                <p>{story.description}</p>
                            </div>
                        </div>
                    </a>
                </div>
            {/each}
        {:else if filteredListItems.length == 0}
            <!-- <video src="/img/loading-{$theme}.webm" autoplay loop muted></video> -->
            <p class="font-display text-xs text-left">
                It's is a bit lonely here. Maybe add a story with the same name?
            </p>
        {/if}
    </div>
</main>

<div class="flex flex-col divide-y">
    {#if !noMoreData}
        <button
            on:click={() => storyList.fetchNextPage()}
            class="absolute inset-x-0 bottom-0 w-full h-10 py-2 focus:outline-none bg-accent text-menu-accent
            text-sm">
            Load more stories!
        </button>
    {/if}
</div>
