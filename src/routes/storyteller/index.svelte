<script>
    import * as api from "$lib/api.js";
    import { onMount } from "svelte";
    import { user } from "$stores/user.js";

    let stories;
    onMount(async () => {
        //console.log($user.jwt)
        try {
            const userData = await api.get("api/users/me", $user.jwt);
        } catch (error) {
            console.error(error);
        }
    });
</script>

<div class="flex flex-col gap-y-2 px-8 py-3.5">
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
                class="flex flex-col gap-y-3 border-2 border-contrast px-3.5 py-2 font-display text-contrast">
                <p class="text-base font-medium">{story.title}</p>
                <p class="text-sm font-text">{story.location}</p>
                <p class="text-sm font-text">{story.description}</p>
            </a>
        {/each}
    {/if}
</div>

<style lang="postcss">
    .btn {
        @apply bg-accent text-primary text-sm px-4 py-3;
    }
</style>
