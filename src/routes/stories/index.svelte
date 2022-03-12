<script lang="ts" context="module">
	
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		// const stories = await fetch('/storiesapi')
		const tags = await fetch('/tagsapi')
		// let storiesData = await stories.json()
		let tagsData = await tags.json()
		return { props: { 
			// listItems: storiesData, 
			// stories: storiesData, 
			tags: tagsData.slice(0, 6),
		}}
	}

	
</script>

<script>

	import { visited } from '../../stores/visited'
	import storyList from "../../stores/storyList";

	export let tags 
	let listItems, stories
  let open = false
	let query = ''
	let locationQuery = ''
	let tagQuery = ''

	storyList.fetchNextPage()
	storyList.subscribe(value => {
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

	const filterByTag = (tag) => {
		tag = tag.toLowerCase()
		listItems = []
		stories.forEach(story => {
			let match = story.categories
			.map(item => item.toLowerCase())
			.filter(item => item.includes(tag))
			if(match.length > 0) listItems.push(story)
		})
		console.log(listItems)
		tagQuery = ''
		open = false
	}

	const visitStory = (id) => {
		visited.set([...$visited, id])
	}

</script>

<!-- story list -->
<main	class="flex flex-col align-items-center gap-y-4 px-4 pb-4 overflow-y-scroll">

		<div class="flex flex-row justify-between 
								w-full gap-x-base divide-x
								border">
			<input type="search" name="search-query" placeholder="Search for a story"
						class="flex-1 py-1 bg-primary text-sm px-2 focus:outline-none"
						bind:value={query}>
			<button class="w-8 h-8 bg-primary focus:outline-none" 
							on:click={search}>
				<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="19" cy="19" r="7" stroke="#000002" stroke-width="1.5"/>
				<path d="M28 28L25 25" stroke="#000002" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
			</button>
		</div>
		
		<div class="pb-4 flex flex-col gap-y-4">
			{#if listItems && listItems.length}
			{#each listItems as story}
			<div>
				<a href="/stories/{story.url}" on:click={() => visitStory(story.id)}>
					<div class="px-3 py-3 w-full 
										border border-black border-1
										text-center font-text
										inline-flex flex-col gap-y-1
										{$visited.includes(story.id) == true ? 'bg-accent text-primary' : 'bg-primary'}">
						<div class="text-base font-display">
							<h1>{story.title}</h1>
						</div>
						<div class="text-sm" >
							<p>{story.author_name}</p>
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
			{:else}
			<p class="font-display text-xs text-left">
				sorry, we could'nt find what you were looking for
			</p>
			{/each}
			{:else} 
			<video src="/img/loading.webm" autoplay loop muted></video>
			{/if}
		</div>
</main>
<!-- story list end -->

<div class="flex flex-col divide-y">
	{#if open}
	<div class="absolute inset-x-0 bottom-8
							flex flex-col gap-y-6
							w-full h-2/5 px-6 py-6
							bg-accent">
		<div class="flex flex-row justify-between
								divide-x divide-primary w-full border border-primary
								bg-accent gap-x-base">
			<input type="text" name="location-query" placeholder="Enter a location"
						class="flex-1 py-1 bg-accent text-sm px-2 text-primary
										placeholder:text-primary focus:outline-none" 
						bind:value={locationQuery}>
			<button class="w-8 h-8 text-primary focus:outline-none" 
							on:click={filterByLocation}>
				<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="19" cy="19" r="7" stroke="#EEE2D2" stroke-width="1.5"/>
				<path d="M28 28L25 25" stroke="#EEE2D2" stroke-width="1.5" stroke-linecap="round"/>
				</svg>

			</button>
		</div>

		<div class="flex flex-row justify-between
								divide-x divide-primary w-full border border-primary
								bg-accent gap-x-base">
			<input type="text" name="tag-query" placeholder="Enter a tag/topic"
						class="flex-1 py-1 bg-accent text-sm px-2 text-primary
									placeholder:text-primary focus:outline-none " 
						bind:value={tagQuery}>
			<button class="w-8 h-8 text-primary focus:outline-none" 
							on:click={() => filterByTag(tagQuery)}>
				<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="19" cy="19" r="7" stroke="#EEE2D2" stroke-width="1.5"/>
				<path d="M28 28L25 25" stroke="#EEE2D2" stroke-width="1.5" stroke-linecap="round"/>
				</svg>
			</button>
		</div>

		<div class="flex flex-row flex-wrap gap-y-4 gap-x-6
								text-sm text-primary">
			{#each tags as tag}
			<button class="border border-primary py-1 px-2"
							on:click={() => filterByTag(tag.name)}>
				{tag.name}
			</button>
			{/each}
			
		</div>

	</div>
	{/if}

	<button 
					on:click={() => open = !open}
					class="{open ? 
							'absolute inset-x-0 bottom-0 w-full h-8 focus:outline-none bg-accent text-primary' : 
							'absolute inset-x-0 bottom-0 w-full h-8 focus:outline-none bg-primary border-t'}">
		Filters
	</button>
</div>



