<script>
	import { visited } from '../stores/visited'

	const visitStory = (id) => {
		visited.set([...$visited, id])
	}

	export let listItems
</script>


{#each listItems as story}
	<div>
		<a href="/stories/{story.url}" on:click={() => visitStory(story.id)}>
			<div class="px-3 py-3 w-full 
								border border-contrast border-1
								text-center font-text
								inline-flex flex-col gap-y-1
								{$visited.includes(story.id) == true ? 'bg-story-accent text-menu-accent' : 'bg-primary'}">
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
	{/each}