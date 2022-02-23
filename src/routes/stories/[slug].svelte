<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ params, fetch, session, stuff }) => {
      // The params object will contain all of the parameters in the route.
      const { slug } = params;
      console.log(slug)

      // Now, we'll fetch the blog post from Strapi
      const res = await fetch('/storiesapi');

      // A 404 status means "NOT FOUND"
      if (res.status === 404) {
          // We can create a custom error and return it.
          // SvelteKit will automatically show us an error page that we'll learn to customise later on.
          const error = new Error(`The post with ID ${slug} was not found`);
          return { status: 404, error };
      } else {
          let data = await res.json();
          data = data.find(story => story.url === slug)
          return { props: { story: data } };
      }
  };
</script>

<script >
  
  export let story
  let open = false
  let openInfoCard = false

</script>

<div class="flex flex-col align-items-center gap-y-4
            w-screen h-screen bg-primary
            text-center relative">
    
  <div class="overflow-y-scroll flex-1
              flex flex-col align-items-center gap-y-2
              font-display text-left
              px-4">
    <div class="px-1 text-base border">
      {story.title}
    </div>

    <div class="flex-1 px-1 text-sm border
                flex flex-col">
      <div id="content" >
        {#each story.submission.blocks as block}
          {block.data.text}
          <br/>
        {/each}
      
      </div>
      <div class="w-10 h-10 ml-auto mt-auto">
        
      </div>
    </div>

  </div>

  {#if openInfoCard}
  <div class="absolute inset-x-0 bottom-8
              bg-accent text-primary text-base
              p-4">
    <div class="flex flex-col gap-y-3">
      <div class="border border-primary text-left
                  p-1 ">
        {story.author_name}
      </div>
      <div class="border border-primary text-left
                  p-1">
        {story.location}
      </div>
    </div>
  </div>
  {/if}


  <div
      class="{open ? 
      'flex-initial flex flex-row justify-around py-2 px-4 bg-accent text-primary' : 
      'flex-initial flex flex-row justify-around py-2 px-4 bg-primary'}"
      style="border-top: black 1.5px solid;">
    <a href="/stories">
      {#if open}
      <div class="w-4 h-4">
        back
      </div>
      {:else}
      <div class="w-4 h-4">
        back
      </div>
      {/if}
    </a>

    <div>
      {#if open}
      <div class="w-4 h-4" on:click={() => { open = !open; openInfoCard = !openInfoCard }}>
        info
      </div>
      {:else}
      <div class="w-4 h-4" on:click={() => { open = !open; openInfoCard = !openInfoCard }}>
        info
      </div>
      {/if}
    </div>

    <div>
      {#if open}
      <div class="w-4 h-4">
        share
      </div>
      {:else}
      <div class="w-4 h-4">
        share
      </div>
      {/if}

      
    </div>
  </div>
</div>
