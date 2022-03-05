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
import { dataset_dev } from 'svelte/internal';
  import Icon from '../../components/Icon.svelte'
  import TextSelection from '../../components/TextSelection.svelte';
  import { variables } from '../../variables';
  
  export let story
  let reader, scrollWindow
  let cnv, ctx, isPainting = false, startX, startY
  let ongoingTouches = []
  let showAnnotationView = false
  let drawingMode = false

  let openInfoCard = false
  let openShareCard = false
  let openCommentCard = false

  $: {
    if(showAnnotationView === true) {
      document.querySelector('#comment-board').classList.remove('hidden')
      story.annotations.forEach(annotation => showAnnotation(annotation))  
      showDrawingBoard()
    } else {
      if(browser && document.querySelector('#comment-board') != null) {
        document.querySelector('#comment-board').classList.add('hidden')
      }
    }
  }

  $: {
    if(drawingMode == true || showAnnotationView == true) {
      cnv = document.querySelector('canvas')
      cnv.height = reader.offsetHeight
      cnv.width = reader.offsetWidth
      ctx = cnv.getContext('2d')
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

  function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
  }
  function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier;

      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }
  function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      console.log("touchstart:" + i + "...");
      ongoingTouches.push(copyTouch(touches[i]));
      var color = '#6A735A';
      ctx.beginPath();
      ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
      ctx.fillStyle = color;
      ctx.fill();
      console.log("touchstart:" + i + ".");
    }
  }
  function handleMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      var color = '#6A735A';
      var idx = ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        console.log("continuing touch "+idx);

        // scale from display coordinates to model coordinates
        var modelX = Math.round( touches[i].pageX * (cnv.width / cnv.offsetWidth) );
        var modelY = Math.round( touches[i].pageY * (cnv.height / cnv.offsetHeight) );
        modelY += reader.parentNode.offsetTop*2

        ctx.beginPath();
        console.log("ctx.lineTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
        ctx.lineTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
        console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
        // ctx.lineTo(modelX, modelY);
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.stroke();

        ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
        console.log(".");
      } else {
        console.log("can't figure out which touch to continue");
      }
    }
  }
  function handleEnd(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;

    for (var i = 0; i < touches.length; i++) {
      var color = '#6A735A';
      var idx = ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        ctx.lineWidth = 4;
        ctx.fillStyle = color;
        ctx.stroke()
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
        ctx.lineTo(touches[i].pageX, touches[i].pageY);
        ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
        ongoingTouches.splice(idx, 1);  // remove it; we're done
      } else {
        console.log("can't figure out which touch to end");
      }
    }
  }

  const initialiseCanvas = () => {
    console.log('info: canvas init')
    showDrawingBoard()
    cnv.addEventListener('pointerdown', beginDraw);
    cnv.addEventListener('pointerup', endDraw);
    cnv.addEventListener('pointermove', draw);
    cnv.addEventListener('touchstart', handleStart);
    cnv.addEventListener('touchend', handleEnd);
    cnv.addEventListener('touchmove', handleMove);
  }
  const showDrawingBoard = () => {
    fetch(`${variables.strapi_url}/api/stories/${story.id}?populate=annotationCanvas`)
    .then(response => response.json())
    .then(data => {
      console.log(data.data.attributes)
      if(data.data.attributes.annotationCanvas.data == null) return

      let prevCanvasUrl = data.data.attributes.annotationCanvas.data.attributes.formats
      prevCanvasUrl = prevCanvasUrl.thumbnail.url ?? prevCanvasUrl.small.url ?? prevCanvasUrl.medium.url
      fetch(prevCanvasUrl)
      .then(response => response.blob())
      .then(blob => {
        let img = new Image()
        img.src = URL.createObjectURL(blob)
        img.onload = () => {
          console.log('info: prev canvas loaded')
          ctx.drawImage(img, 0, 0, cnv.width, cnv.height)
        }
      })

    })
  }
  const clearCanvas = () => {
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    cnv.removeEventListener('pointerdown', beginDraw)
    cnv.removeEventListener('pointerup', endDraw)
    cnv.removeEventListener('pointermove', draw)
    cnv.removeEventListener('touchstart', handleStart)
    cnv.removeEventListener('touchend', handleEnd)
    cnv.removeEventListener('touchmove', handleMove)
    document.querySelector('#drawing-board').classList.add('hidden')
  }
  const saveCanvas = () => {
    cnv.toBlob((blob) => {
      let uploadData = new FormData() 
      uploadData.append('files', blob, `${story.id}-canvas.png`)
      fetch(`${variables.strapi_url}/api/upload`, {
        method: 'POST',
        body: uploadData
      })
      .then(response => response.json())
      .then(data => {
        showAnnotationView = true
        drawingMode = false
        clearCanvas()
        showDrawingBoard()
        const canvasData = {
          data: {
            annotationCanvas: data[0].id
          }
        }
        return fetch(`${variables.strapi_url}/api/stories/${story.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(canvasData)
        })
      })
    })
    
  }

</script>



<div class="flex-1 flex flex-col align-items-center gap-y-4
            w-screen overflow-y-scroll bg-primary
            text-center">
  
  
    <div bind:this={scrollWindow} class="overflow-y-scroll flex-1
                flex flex-col align-items-center gap-y-2
                font-display text-left
                mx-4">
      <div class="px-1 text-base border">
        {story.title}
      </div>
      <div class="relative flex-1 text-sm border flex flex-col">
        <div bind:this={reader} id="reader"
            class="{(showAnnotationView == true || drawingMode == true) ?
                   'flex flex-col blur-sm p-2' :
                   'flex flex-col p-2'}">
          {#each story.submission.blocks as block}
            {#if block.data.text}
            <section id="{"target-"+block.id}">{block.data.text}</section>
            {/if}
            {#if block.data.file}
            <img class="self-center" id="{"target-"+block.id}" src={block.data.file.url} alt={block.data.caption} />
            {/if}
          {/each}
        </div>
    
        <section id="drawing-board" class="hidden absolute left-0 top-0">
          <button class="absolute right-0 top-0 w-4 h-4 m-1" on:click={() => { clearCanvas(); drawingMode = false; showAnnotationView = true; }}>
            <Icon src="/icons/Close Button - Black.svg"    alt="comment - close" />
          </button>
          <canvas bind:this={cnv}>
    
            your browser does not support the canvas
          </canvas>
        </section>
        <div class="mt-auto ml-auto">
          <div class="flex flex-row">
          {#if drawingMode}
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
          {:else if openCommentCard}
          <button>
            <Icon src="/icons/Comment - Highlight Icon.svg" alt="comment - highlight" />
          </button>
          <button on:click={() => { drawingMode = true; showAnnotationView = false; initialiseCanvas(); }}>
            <Icon src="/icons/Comment - Draw Icon.svg"      alt="comment - draw" />
          </button>
      
          <button on:click={() => { openCommentCard = !openCommentCard; showAnnotationView = true }}>
            <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
          </button>
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
        </div>
    
      </div>
     
    </div>
  

  <section>
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
  </section>


  <!-- annotation view -->
  <section id="comment-board" class="hidden">
    {#each story.annotations as annotation}
    <section class="{`absolute bg-accent text-primary p-2`}" id={"anno-"+annotation.blockID}>
      <p>{annotation.content}</p>
    </section>
    {/each}
  </section>
  
</div>

<TextSelection readerID="reader" storyID={story.id}/>