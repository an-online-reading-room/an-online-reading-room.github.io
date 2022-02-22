<script>
	// import dotenv from 'dotenv'
	// dotenv.config()
	import { onMount } from "svelte";

	const API_URL = 'https://reading-room-backend.herokuapp.com/api'

	let query = '', stories = [], listItems = []
	const slugify = (str) => {
		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";
		for (var i = 0, l = from.length ; i<l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes

		return str;
	};

	onMount(async () => {
		const res = await fetch(`${API_URL}/stories?populate=author,categories`)
		stories = await res.json()
		stories = stories.data
		stories = stories.map(story => {
			return {
				id: story.id,
				title: story.attributes.title,
				submission: story.attributes.submission,
				location: story.attributes.location,
				author_name: story.attributes.author.data.attributes.username,
				url: slugify(story.attributes.title),
				categories: story.attributes.categories.data.map(category => category.attributes.name)
			}
		})
		listItems = stories
	})

	const search = (e) => {
		listItems = stories.filter(story => {
			return story.title.includes(query) ||
						 story.author_name.includes(query) || 
						 story.location.includes(query)
		})
	}
</script>

<main	class="flex flex-col align-items-center gap-y-4 px-4 h-full">

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
		
		<div class="list-container flex-1 overflow-y-scroll pb-4
							flex flex-col gap-y-4">
			{#each listItems as story}
			<div>
				<a href="/stories/{story.url}" >
					<div class="px-3 py-3 w-full
										border border-black border-1
										text-center font-text
										inline-flex flex-col gap-y-1">
						<div class="text-base font-display">
							<h1>{story.title}</h1>
						</div>
						<div class="text-sm" >
							<p>{story.author_name}</p>
						</div>
						<div class="text-sm">
							<p>{story.location}</p>
						</div>
						
						
					</div>
				</a>
			</div>
			{:else}
			<!-- this block renders when photos.length === 0 -->
			<p class="font-display text-xs text-left">
				sorry, we could'nt find what you were looking for
			</p>
			{/each}
		</div>


</main>

