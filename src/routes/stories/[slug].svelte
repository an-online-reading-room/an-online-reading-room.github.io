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
  
  export let story
  let openInfoCard = false
  let openShareCard = false
  let openCommentCard = false
  let selectionControls, annotationTextControl

  const showSelectionControls = () => {
    let selection = document.getSelection()
    let text = selection.toString()
    if(text !== "") {
      let rect = selection.getRangeAt(0).getBoundingClientRect()
      selectionControls.style.top = `calc(${rect.top}px - 48px)`
      selectionControls.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 40px)`
      selectionControls['text'] = text
      document.body.appendChild(selectionControls)
    }
  }
  const removeControls = () => {
    let controls = [
      document.querySelector('#selection-controls'),
      document.querySelector('#selection-text-annotation')
    ]
    controls.forEach(control => {
      if(control !== null) {
        control.remove()
        document.getSelection().removeAllRanges()
      }
    })
    
  }

  const showAnnotationTextControl = () => {

    let selection = document.querySelector('#selection-controls')
    let pos = selection.style
    console.log(annotationTextControl)
    annotationTextControl.style.top = pos.top
    annotationTextControl.style.left = pos.left
    annotationTextControl['text'] = selection.getAttribute('text')
    document.body.appendChild(annotationTextControl)
    
  }

  onMount(() => {
    // document.body.onpointerdown = removeControls
    
    
  })

</script>



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
      <div id="content" on:pointerup={showSelectionControls} class="p-2">
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
      <div class="border border-primary text-left
                  p-1 text-sm">
        {story.description}
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

<section class="hidden">
  <span bind:this={selectionControls} id="selection-controls">
    <main class="flex flex-row gap-x-3 justify-between p-3
                text-primary bg-accent underline">
      <button on:click={showAnnotationTextControl} id="btn-annotate">text</button>
      <button id="btn-upload">upload</button>
      <button id="btn-link">link a story</button>
    </main>
  </span>

  <span bind:this={annotationTextControl} id="selection-text-annotation">
    <main style="background-color: red">
      <input type="text" name="annotation" id="annotation">
      <button>annotate</button>
    </main>
  </span>
</section>
