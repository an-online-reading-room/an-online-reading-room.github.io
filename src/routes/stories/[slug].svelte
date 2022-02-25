<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export const load: Load = async ({ params, fetch, session, stuff }) => {
      // The params object will contain all of the parameters in the route.
      const { slug } = params;

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
  
  import Icon from '../../components/Icon.svelte'
  import '@recogito/recogito-js/dist/recogito.min.css';

  
  export let story
  let openInfoCard = false
  let openShareCard = false
  let openCommentCard = false
  let annotationsArea

  onMount(async () => {
    // const Recogito = (await import('@recogito/recogito-js')).default

    annotationsArea = Recogito.init({
        content: 'content' // ID or DOM element
      });
    // jQuery(function ($) {
    //     $('#content')
    //     .annotator()
    //     .annotator('setupPlugins', {}, {
    //       // Disable the tags plugin
    //       Tags: false,
    //       // Filter plugin options
    //       Filter: {
    //         addAnnotationFilter: false, // Turn off default annotation filter
    //         filters: [{label: 'Quote', property: 'quote'}] // Add a quote filter
    //       }
    //     })
    //     .annotator('addPlugin', 'Touch', {
    //       force: true,
    //       useHighlighter: true
    //     });
    // });
  })

</script>

<svelte:head>
  <link rel="stylesheet" href="/libs/annotator/annotator.min.css">
  <link rel="stylesheet" href="/libs/annotator/annotator.touch.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="/libs/annotator/annotator-full.min.js" />
  <script src="/libs/annotator/annotator.touch.min.js" />
  <script src="/libs/recogito.min.js" />
</svelte:head>

<div class="flex flex-col align-items-center gap-y-4
            w-screen h-full bg-primary
            text-center relative">
    
  <div class="overflow-y-scroll flex-1
              flex flex-col align-items-center gap-y-2
              font-display text-left
              px-4">
    <div class="px-1 text-base border">
      {story.title}
    </div>

    <div class="flex-1 text-sm border
                flex flex-col">
      <div id="content" class="px-1">
        {#each story.submission.blocks as block}
          {block.data.text}
          <br/>
        {/each}
      
      </div>
      <div class="ml-auto mt-auto">

        {#if openCommentCard}
          <div class="flex flex-row">
            <button>
              <Icon src="/icons/Comment - Highlight Icon.svg" alt="comment - highlight" />
            </button>
            <button>
              <Icon src="/icons/Comment - Draw Icon.svg"      alt="comment - draw" />
            </button>
            <button>
              <Icon src="/icons/Comment - Delete Icon.svg"    alt="comment - delete" />
            </button>
            <button>
              <Icon src="/icons/Comment - Save Icon.svg"      alt="comment - save" />
            </button>
            <button on:click={() => { openCommentCard = !openCommentCard }}>
              <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
            </button>
          </div>
        {:else}
          <button class="px-3 py-2 bg-black text-white"
                  on:click={() => { openCommentCard = !openCommentCard }}>
            Leave a Note
          </button>
        {/if}
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

  {#if openShareCard}
  <div class="absolute inset-x-0 bottom-8
              bg-accent text-primary text-base
              p-4">
    <div class="flex flex-col gap-y-3">
      <div class="border border-primary text-left
                  p-1 ">
        Send Story
      </div>
      <div class="
                  p-1">
        <div class="flex flex-row flex-nowrap justify-between">
          <a href={"whatsapp://send?text="+"https://the-reading-room.netlify.app/stories/"+story.url} data-action="share/whatsapp/share">
            <Icon src="/icons/Share - WhatsApp Icon.svg" alt="share - whatsapp" />
          </a>
          <a href="#">
            <Icon src="/icons/Share - Instagram Icon.svg" alt="share - instagram" />
          </a>
          <Icon src="/icons/Share - Email Icon.svg" alt="share - email" />
          <Icon src="/icons/Share - Message Icon.svg" alt="share - message" />
          <Icon src="/icons/Share - URL Icon.svg" alt="share - url" />
        </div>
      </div>
    </div>
  </div>
  {/if}


  <div
      class="{(openInfoCard || openShareCard) ? 
      'flex-initial flex flex-row justify-around py-2 px-4 bg-accent text-primary' : 
      'flex-initial flex flex-row justify-around py-2 px-4 bg-primary'}"
      style="border-top: black 1.5px solid;">
    <a href="/stories">
      {#if (openInfoCard || openShareCard)}
      <div class="w-4 h-4">
        <Icon src="/icons/Back Icon - White.svg" alt="back icon" />
      </div>
      {:else}
      <div class="w-4 h-4">
        <Icon src="/icons/Back Icon - Black.svg" alt="back icon" />
      </div>
      {/if}
    </a>

    <div>
      {#if (openInfoCard || openShareCard)}
      <div class="w-4 h-4" on:click={() => { openInfoCard = !openInfoCard; openShareCard = false }}>
        <Icon src="/icons/Info Icon - White.svg" alt="info icon" />
      </div>
      {:else}
      <div class="w-4 h-4" on:click={() => { openInfoCard = !openInfoCard; openShareCard = false }}>
        <Icon src="/icons/Info Icon - Black.svg" alt="info icon" />
      </div>
      {/if}
    </div>

    <div>
      {#if (openInfoCard || openShareCard)}
      <div class="w-4 h-4" on:click={() => { openShareCard = !openShareCard; openInfoCard = false }}>
        <Icon src="/icons/Large Share Icon - White.svg" alt="share icon" />
      </div>
      {:else}
      <div class="w-4 h-4" on:click={() => { openShareCard = !openShareCard; openInfoCard = false }}>
        <Icon src="/icons/Large Share Icon - Black.svg" alt="share icon" />
      </div>
      {/if}

      
    </div>
  </div>
</div>
