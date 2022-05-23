<script>

	import storyList from '$stores/storyList.js';
	import List from '$components/List.svelte'
	import { theme } from '$stores/theme.js'

	let listItems, stories, loading = true, noMoreData = false
  let open = false
	let query = ''
	let locationQuery = ''
	let tagQuery = ''

	storyList.fetchNextPage()
	storyList.subscribe(value => {
		loading = value.loading
		noMoreData = value.noMoreData
		listItems = value.data
		stories = value.data
	})
	
	const search = (e) => {
		query = query.toLowerCase()
		listItems = stories.filter(story => {
			return story.title.toLowerCase().includes(query) ||
						 story.author_name.toLowerCase().includes(query) || 
						 story.location.toLowerCase().includes(query)
		})
		query = ''
	}

	const filterByLocation = (e) => {
		locationQuery = locationQuery.toLowerCase()
		listItems = stories.filter(story => {
			return story.location.toLowerCase().includes(locationQuery)
		})
		locationQuery = ''
		open = false
	}


</script>

<!-- story list -->
<main	class="flex flex-col align-items-center gap-y-4 px-4 pb-10 overflow-y-scroll text-contrast">

		<div class="flex flex-row justify-between 
								w-full gap-x-base divide-x
								border border-contrast">
			<input type="search" name="search-query" placeholder="Search for a story"
						class="flex-1 py-1 bg-primary text-sm px-2 focus:outline-none placeholder:text-contrast"
						bind:value={query}>
			<button class="w-8 h-8 bg-primary focus:outline-none stroke-contrast" 
							on:click={search}>
				<svg class="stroke-current" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="19" cy="19" r="7" stroke-width="1.5"/>
				<path d="M28 28L25 25" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
			</button>
		</div>
		
		<div class="flex flex-col gap-y-4">
			{#if loading}
			<video src="/img/loading-{$theme}.webm" autoplay loop muted></video>
			{:else}
			{#if listItems.length > 0}
			<List {listItems}></List>
			{#if !noMoreData}
			<button class="mt-auto p-2 self-center text-white font-display text-xs bg-black"
						on:click={() => storyList.fetchNextPage()}>
				Load more stories
			</button>
			{/if}
			{:else if listItems.length == 0}
			<!-- <video src="/img/loading-{$theme}.webm" autoplay loop muted></video> -->

			<p class="font-display text-xs text-left">
				It's is a bit lonely here. Maybe add a story with the same name?
			</p>
			{/if} 
			{/if}
		</div>

		
</main>
<!-- story list end -->

<div class="flex flex-col divide-y">
	{#if open}
	<div class="absolute inset-x-0 bottom-8
							flex flex-col gap-y-4
							w-full h-2/5 px-6 py-6
							bg-accent">
		<div class="flex flex-row justify-between
								divide-x divide-current w-full border border-menu-accent
								bg-accent gap-x-base">
			<input type="text" name="location-query" placeholder="Enter a location"
						class="flex-1 py-1 bg-accent text-sm px-2 text-primary
										placeholder:text-menu-accent focus:outline-none" 
						bind:value={locationQuery}>
			<button class="w-8 h-8 text-primary focus:outline-none text-menu-accent" 
							on:click={filterByLocation}>
				<svg class="stroke-current" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="19" cy="19" r="7" stroke-width="1.5"/>
				<path d="M28 28L25 25" stroke-width="1.5" stroke-linecap="round"/>
				</svg>

			</button>
		</div>

		<div class="flex flex-row justify-between
								divide-x divide-current w-full border border-menu-accent
								bg-accent gap-x-base">
			<input type="text" name="tag-query" placeholder="Enter a tag/topic"
						class="flex-1 py-1 bg-accent text-sm px-2 text-menu-accent
									placeholder:text-menu-accent focus:outline-none " 
						bind:value={tagQuery}>
			<button class="w-8 h-8 text-primary focus:outline-none text-menu-accent" 
							>
				<svg class="stroke-current" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="19" cy="19" r="7" stroke-width="1.5"/>
				<path d="M28 28L25 25" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
			</button>
		</div>

	</div>
	{/if}

	<button 
					on:click={() => open = !open}
					class="{open ? 
							'absolute inset-x-0 bottom-0 w-full h-10 py-2 focus:outline-none bg-accent text-menu-accent' : 
							'absolute inset-x-0 bottom-0 w-full h-10 py-2 focus:outline-none bg-primary text-contrast border-t'}">
		Filters
	</button>
</div>



