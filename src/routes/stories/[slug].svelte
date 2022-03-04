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
  import { browser } from '$app/env';
  import Icon from '../../components/Icon.svelte'
  import TextSelection from '../../components/TextSelection.svelte';
  import { variables } from '../../variables';
  
  export let story
  let reader, scrollWindow
  let cnv, ctx, isPainting = false, startX, startY
  let showAnnotationView = false
  let drawingMode = false

  let openInfoCard = false
  let openShareCard = false
  let openCommentCard = false

  $: {
    if(showAnnotationView === true) {
      document.querySelector('#comment-board').classList.remove('hidden')
      story.annotations.forEach(annotation => showAnnotation(annotation))  
    } else {
      if(browser && document.querySelector('#comment-board') != null) {
        document.querySelector('#comment-board').classList.add('hidden')
      }
    }
  }

  $: {
    if(drawingMode == true) {
      cnv = document.querySelector('canvas')
      cnv.height = reader.offsetHeight
      cnv.width = reader.offsetWidth
      document.querySelector('#drawing-board').classList.remove('hidden')
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
    const block = document.querySelector(`section#target-${annotation.blockID}`)
    const target = block.innerHTML.substring(annotation.startOffset, annotation.startOffset+annotation.length)
    const newHTML = block.innerHTML.substring(0, annotation.startOffset) + 
                    `<span class="highlight">${target}</span>` + 
                    block.innerHTML.substring(annotation.startOffset, annotation.startOffset+annotation.length)
    block.innerHTML = newHTML
    
    const rect = document.querySelector(`section#target-${annotation.blockID} span`).getBoundingClientRect()
    const comment = document.querySelector(`section#anno-${annotation.blockID}`)
    // comment.classList.remove('hidden')
    comment.style.top = `calc(${rect.bottom + scrollWindow.scrollTop}px + 0px)`
    comment.style.left = "1.5rem"
    // block.appendChild(comment)
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

    console.log(e.clientX + scrollWindow.offsetLeft, e.clientY + scrollWindow.parentNode.offsetTop)
    console.log(e.clientX, e.clientY)
    ctx.lineTo(e.clientX - scrollWindow.offsetLeft, 
              e.clientY - scrollWindow.parentNode.offsetTop - reader.parentNode.offsetTop);
    // ctx.lineTo(50, 50);
    ctx.stroke();
  }
  const beginDraw = (e) => {
    console.log('info: beginning draw')
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
  }
  const endDraw = (e) => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
  }

  const initialiseCanvas = () => {
    console.log('info: canvas init')
    
    ctx = cnv.getContext('2d')
    cnv.addEventListener('mousedown', beginDraw);
    cnv.addEventListener('mouseup', endDraw);
    cnv.addEventListener('mousemove', draw);
  }
  const clearCanvas = () => {
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    cnv.removeEventListener('mousedown', beginDraw)
    cnv.removeEventListener('mouseup', endDraw)
    cnv.removeEventListener('mousemove', draw)
    document.querySelector('#drawing-board').classList.add('hidden')
  }
  const saveCanvas = () => {
    let img = cnv.toDataURL("image/png").replace("image/png", "image/octet-stream")
    img = ctx.getImageData(0, 0, cnv.width, cnv.height).data.buffer
    cnv.toBlob((blob) => {
      let uploadData = new FormData() 
      uploadData.append('ref', 'api::story.story')
      uploadData.append('field', 'annotationCanvas')
      uploadData.append('refID', `${story.id}`)
      uploadData.append('files', blob, `${story.id}-canvas.png`)
      
      fetch(`${variables.strapi_url}/api/upload`, {
        method: 'POST',
        body: uploadData
      })
    })
    
  }

</script>



<div class="flex flex-col align-items-center gap-y-4
            w-screen h-full bg-primary
            text-center relative">
    
  <div bind:this={scrollWindow} class="overflow-y-scroll flex-1
              flex flex-col align-items-center gap-y-2
              font-display text-left
              mx-4 relative">
    <div class="px-1 text-base border">
      {story.title}
    </div>

    <div class="flex-1 text-sm border
                flex flex-col relative">
      <div bind:this={reader} id="reader" class="{(showAnnotationView == true || drawingMode == true) ? 'blur-sm p-2' : 'p-2'}">
        {#each story.submission.blocks as block}
          <section id="{"target-"+block.id}">{block.data.text}</section>
          
        {/each}
      </div>

      <div class="ml-auto mt-auto">

        {#if drawingMode}
        <div class="flex flex-row">
          <button on:click={() => { drawingMode = true; initialiseCanvas(); }}>
            <Icon src="/icons/Comment - Draw Icon.svg"      alt="comment - draw" />
          </button>
          <button>
            <Icon src="/icons/Comment - Delete Icon.svg" alt="comment - delete" />
          </button>
          <button on:click={clearCanvas}>
            <Icon src="/icons/Comment - Delete Icon.svg" alt="comment - delete" />
          </button>
          <button on:click={saveCanvas}>
            <Icon src="/icons/Comment - Save Icon.svg" alt="comment - save" />
          </button>
          <button on:click={() => { openCommentCard = !openCommentCard }}>
            <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
          </button>
        </div>
        {:else if openCommentCard}
        <div class="flex flex-row">
          <button>
            <Icon src="/icons/Comment - Highlight Icon.svg" alt="comment - highlight" />
          </button>
          <button on:click={() => { drawingMode = true; showAnnotationView = false; initialiseCanvas(); }}>
            <Icon src="/icons/Comment - Draw Icon.svg"      alt="comment - draw" />
          </button>
          
          <button on:click={() => { openCommentCard = !openCommentCard; showAnnotationView = true }}>
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

      
      <section id="drawing-board" class="hidden absolute left-0 top-0">
        <button class="absolute right-0 top-0 w-4 h-4 m-1" on:click={() => { clearCanvas(); drawingMode = false; showAnnotationView = true; }}>
          <Icon src="/icons/Close Button - Black.svg"    alt="comment - close" />
        </button>
        <canvas bind:this={cnv}>
        
          your browser does not support the canvas
        </canvas>
      </section>
      
     
    </div>
  </div>

  <!-- annotation view -->
  <section id="comment-board" class="hidden">
    {#each story.annotations as annotation}
    <section class="{`absolute bg-accent text-primary p-2`}" id={"anno-"+annotation.blockID}>
      <p>{annotation.content}</p>
    </section>
    {/each}
  </section>
  

  

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