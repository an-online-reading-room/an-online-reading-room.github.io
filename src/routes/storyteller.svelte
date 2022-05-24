<script>
	import Header from '../components/Header.svelte';
	import * as api from '$lib/api.js';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user.js';

	export let stories;
	onMount(async () => {
		//console.log($user.jwt)
		const userData = await api.get('api/users/me', $user.jwt);
		stories = userData.stories;
	});
</script>

<Header />

<div class="border-t py-3.5 px-6">
	<div class="flex flex-col gap-y-2">
		<a href="/storybuilder">
			<div class="btn">Create a new story</div>
		</a>
		<a href="/prompts">
			<div class="btn">Prompts</div>
		</a>
		{#if stories}
			{#each stories as story}
				<div class="flex flex-col gap-y-3 border-2 border-contrast px-3.5 py-2 font-display">
					<p class="text-base font-medium">{story.title}</p>
					<p class="text-sm font-text">{story.location}</p>
					<p class="text-sm font-text">{story.description}</p>
				</div>
			{/each}
		{/if}
	</div>
</div>

<!--<main class="font-text text-sm text-contrast leading-4 px-6">
    <section class="flex flex-col gap-y-6">
 
      <a href="/prompts">
        <p class="underline">What do I write about?</p>
      </a>
      <a href="/storybuilder">
        <p class="underline">I have a story to tell</p>
      </a>
    </section>

   
  </main>
-->
<style lang="postcss">
	.btn {
		@apply bg-accent text-primary text-sm px-4 py-3;
	}
</style>
