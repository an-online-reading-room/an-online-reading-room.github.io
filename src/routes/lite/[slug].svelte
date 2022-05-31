<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { variables } from '$lib/variables';
    import { flattenStrapiResponse } from '$lib/utils/api'
  
    export const load: Load = async ({ params, fetch, session, stuff }) => {
      const strapiRes = await (await fetch(`${variables.strapi_url}/api/stories?slug=${params.slug}`)).json()
      
      const data = flattenStrapiResponse(strapiRes)
      return { props: { story: data } }
        
    };
</script>

<script>
    export let story

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const suffix = (day >= 4 &&  day <= 20) || (day >= 24 && day <= 30)
        ? "th"
        : ["st", "nd", "rd"][day % 10 - 1];
        const month = date.toLocaleDateString('en-US', {month: "long"})
        const year = date.getFullYear()
        return `${day}${suffix} ${month} ${year}`
        return date
    }
</script>

<div class="divide-y">
    <section class="flex justify-between py-2 px-8 border-b">
        <div>
            <button class="font-text text-sm underline">Back</button>
        </div>
    
        <div>
            <button class="font-text text-sm underline">Next</button>
        </div>
    </section>
    <div class="px-8">
        <article class="flex flex-col gap-y-3 py-2 text-left">
            <hgroup class="flex flex-col gap-y-1">
                <h3 class="font-display font-bold text-xxs uppercase text-accent">{formatDate(story.publishedAt)}</h3>
                <h1 class="font-display font-bold text-4xl">{story.title}</h1>
                <h2 class="font-display font-normal text-xs">{story.location}</h2>
            </hgroup>
        
            <main>
                {#each story.submission.blocks as block}
                <p>{block.data.text}</p>
                {/each}
            </main>
        </article>
    </div>

    <footer class="absolute inset-x-0 bottom-0
    py-2 px-8
    bg-accent text-primary">
        <nav class="flex justify-between">
            <button>xxx</button>
            <button>xxx</button>
            <button>xxx</button>
        </nav>
    </footer>
</div>
