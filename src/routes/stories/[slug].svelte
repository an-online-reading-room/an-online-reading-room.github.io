<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  export const load: Load = async ({ params, fetch, session, stuff }) => {
      const { slug } = params;
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
  import TextSelection from '../../components/TextSelection.svelte';
  
  export let story
  let reader, scrollWindow
  let cnv, ctx, isPainting = false, startX, startY
  let openInfoCard = false
  let openShareCard = false
  let openCommentCard = false
  let showAnnotationView = false

  $: {
    if(showAnnotationView === true) {
      story.annotations.forEach(annotation => showAnnotation(annotation))
      cnv.height = reader.offsetHeight
      cnv.width = reader.offsetWidth
      cnv.classList.remove('hidden')
      initialiseCanvas()
    }
  }

  const copyPageLink = () => {
    // let temp = document.createElement('input')
    // temp.classList.add('hidden')
    // document.body.appendChild(temp)
    // temp.value = encodeURI(window.location.href)
    // console.log(temp.value)
    // temp.select()
    // let result = document.execCommand('copy') 
    // document.body.removeChild(temp)
    navigator.clipboard.writeText(window.location.href)
    openShareCard = false
  }

  const showAnnotation = (annotation) => {
    const block = document.querySelector(`section#${annotation.blockID}`)
    const target = block.innerHTML.substring(annotation.startOffset, annotation.startOffset+annotation.length)
    const newHTML = block.innerHTML.substring(0, annotation.startOffset) + 
                    `<span class="highlight">${target}</span>` + 
                    block.innerHTML.substring(annotation.startOffset, annotation.startOffset+annotation.length)
    block.innerHTML = newHTML
    
    const rect = document.querySelector(`section#${annotation.blockID} span`).getBoundingClientRect()
    const comment = document.querySelector(`section#anno-${annotation.blockID}`)
    comment.classList.remove('hidden')
    comment.style.top = `calc(${rect.bottom + scrollWindow.scrollTop}px + 0px)`
    comment.style.left = "1.5rem"
    block.appendChild(comment)
    // console.log(reader)
    
  }

  const draw = (e) => {
    if(!isPainting) {
      return;
    }
    console.log('info: drawing')

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#6A735A'

    ctx.lineTo(e.clientX - scrollWindow.offsetLeft, e.clientY - scrollWindow.offsetTop);
    ctx.stroke();
}

  const initialiseCanvas = () => {
    ctx = cnv.getContext('2d')
    cnv.addEventListener('pointerdown', (e) => {
      console.log('info: beginning draw')
      isPainting = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    cnv.addEventListener('pointerup', e => {
      isPainting = false;
      ctx.stroke();
      ctx.beginPath();
    });

    cnv.addEventListener('pointermove', draw);
  }

</script>



<div class="flex flex-col align-items-center gap-y-4
            w-screen h-full bg-primary
            text-center relative">
    
  <div bind:this={scrollWindow} class="overflow-y-scroll flex-1
              flex flex-col align-items-center gap-y-2
              font-display text-left
              px-4 relative">
    <div class="px-1 text-base border">
      {story.title}
    </div>

    <div class="flex-1 text-sm border
                flex flex-col relative">
      <div bind:this={reader} id="reader" class="{showAnnotationView == true ? 'blur-sm p-2' : 'p-2'}">
        {#each story.submission.blocks as block}
          <section id={block.id}>{block.data.text}</section>
          
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
          
          <button on:click={() => { openCommentCard = !openCommentCard }}>
            <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
          </button>
        </div>
        {:else if showAnnotationView} 
        <button class="px-3 py-2 bg-black text-white"
                  on:click={() => { openCommentCard = !openCommentCard }}>
          Leave a Note
        </button>
        {:else}
        <button on:click={() => { showAnnotationView = !showAnnotationView }}>
          <Icon src="/icons/Comment Button - White on Black.svg" alt="show comments" />
        </button>
        {/if}
      </div>

      <canvas bind:this={cnv} class="hidden absolute left-0 top-0">
        your browser does not support the canvas
      </canvas>
     
    </div>
  </div>

  <!-- annotation view -->
  {#each story.annotations as annotation}
  <section class="{`hidden absolute bg-accent text-primary p-2`}" id={"anno-"+annotation.blockID}>
    <p>{annotation.content}</p>
  </section>
  {/each}
  

  

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
          <a href={"mailto:?subject="+story.url}>
            <Icon src="/icons/Share - Email Icon.svg" alt="share - email" />
          </a>
          <a href={"sms:?body="+story.url}>
            <Icon src="/icons/Share - Message Icon.svg" alt="share - message" />
          </a>
          <a href={window.location.href} on:click={copyPageLink}>
            <Icon src="/icons/Share - URL Icon.svg" alt="share - url" />
          </a>
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

<TextSelection readerID="reader" storyID={story.id}/>