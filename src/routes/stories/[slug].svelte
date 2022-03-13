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
  import theme from '../../stores/theme';
  import html2canvas from 'html2canvas'
  
  export let story
  let reader, scrollWindow
  let cnv, ctx, isPainting = false, startX, startY
  let prevCnv, prevCtx, prevCnvImg
  let ongoingTouches = []
  let showAnnotationView = false
  let drawingMode = false, selectionMode = false

  let openInfoCard = false
  let openShareCard = false
  let openCommentCard = false

  let shareTextWhatsapp = `
  The Reading Room is a collaborative storytelling project that enables us to think of place differently. Through storytelling, we can take the initiative of re-defining a place beyond its history and geography.%0a
  *${story.title}*%0a
  _${story.description}_%0a
  Read it here ${variables.site_url}/stories/${story.url}
  `
  let shareTextEmail = `
  The Reading Room is a collaborative storytelling project that enables us to think of place differently. Through storytelling, we can take the initiative of re-defining a place beyond its history and geography.%0D%0A
  ${story.title}%0D%0A
  ${story.description}%0D%0A
  Read it here ${variables.site_url}/stories/${story.url}
  `

  $: {
    if(showAnnotationView === true) {
      story.annotations.forEach(annotation => showAnnotation(annotation))  
      showDrawingBoard()
    } else {
      if(browser && document.querySelector('#drawing-board') != null) {
        story.annotations.forEach(annotation => hideAnnotation(annotation))  
        console.log('adding')
        console.log(document.querySelector('#drawing-board'))
        // if(Array.from(document.querySelector('#drawing-board').classList).includes('hidden') == false) {
          document.querySelector('#drawing-board').classList.add('hidden')
        console.log(document.querySelector('#drawing-board'))

        // }
      }
    }
  }

  $: {
    if(drawingMode == true || showAnnotationView == true) {
      cnv = document.querySelector('canvas')
      cnv.height = reader.offsetHeight
      cnv.width = reader.offsetWidth
      ctx = cnv.getContext('2d')
      prevCnv.height = reader.offsetHeight
      prevCnv.width = reader.offsetWidth
      prevCtx = prevCnv.getContext('2d')
      console.log('removign hidden')
      document.querySelector('#drawing-board').classList.remove('hidden')

      if(drawingMode == true && showAnnotationView == false) {
        cnv.parentNode.classList.add('z-20')
      } else {
        cnv.parentNode.classList.remove('z-20')
      }
    }

    
  }

  const captureScreen = () => {
    document.querySelector('#capture').classList.remove('hidden')
    html2canvas(document.querySelector('#capture'))
    .then(canvas => {
      document.querySelector('#capture').classList.add('hidden')
      var link = document.createElement('a');
      link.download = 'story.png';
      link.href = canvas.toDataURL()
      link.click();
      let ig = document.createElement('a')
      ig.href = 'instagram://story-camera'
      ig.click()
    })
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
    const block = document.querySelector(`section#target_${annotation.blockID}`) 
    console.log(`section#target_${annotation.blockID}`)
    block.classList.add('highlight')

    
    const svg = block.parentElement.previousElementSibling
    svg.classList.remove('hidden')
    svg.addEventListener('click', () => {
      const comments = document.querySelectorAll('.comment-view')
      Array.from(comments).forEach(comment => {
        if(comment.id != `comments-${annotation.blockID}`) {
          comment.classList.add('hidden')
        }
      })

      const rect = document.querySelector(`section#target_${annotation.blockID}`).getBoundingClientRect()
      const comment = document.querySelector(`section#comments-${annotation.blockID}`)
      comment.classList.toggle('hidden')
    })
  
  }
  const hideAnnotation = (annotation) => {
    const block = document.querySelector(`section#target_${annotation.blockID}`)
    block.innerHTML = block.dataset.content
    block.classList.remove('highlight')
    block.parentElement.previousElementSibling.classList.add('hidden')
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

  function copyTouch(touch) {
    return {identifier: touch.identifier,clientX: touch.clientX,clientY: touch.clientY};
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
  function findPos (obj) {
    var curleft = 0,
        curtop = 0;

    if (obj.offsetParent) {
      do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return { x: curleft-reader.parentNode.parentNode.scrollLeft, y: curtop-reader.parentNode.parentNode.scrollTop };
        // return { x: curleft, y: curtop };
    }
}
  function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    var touches = evt.changedTouches;
    var offset = findPos(cnv)

    for (var i = 0; i < touches.length; i++) {
      if(touches[i].clientX-offset.x >0 && touches[i].clientX-offset.x < parseFloat(cnv.width) && touches[i].clientY-offset.y >0 && touches[i].clientY-offset.y < parseFloat(cnv.height)){
            evt.preventDefault();
        console.log("touchstart:" + i + "...");
        ongoingTouches.push(copyTouch(touches[i]));
        // var color = '#6A735A'
        // ctx.beginPath();
        // ctx.arc(touches[i].clientX-offset.x, touches[i].clientY-offset.y, 4, 0, 2 * Math.PI, false); // a circle at the start
        // ctx.fillStyle = color;
        // ctx.fill();
        console.log("touchstart:" + i + ".");
      }
    }
  }
  function handleMove(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    // var offset = {
    //   x: reader.parentNode.offsetLeft,
    //   y: reader.parentNode.offsetTop 
    //   + reader.parentNode.parentNode.offsetTop
    //   + reader.parentNode.parentNode.scrollTop
    // }
    var offset = findPos(cnv)
    // offset.x += pos.x
    // offset.y += pos.y
    console.log(offset)
    console.log(ongoingTouches)

    for (var i = 0; i < touches.length; i++) {
      var color = '#6A735A';
      var idx = ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        console.log("continuing touch " + idx);
        ctx.beginPath();
        console.log("ctx.moveTo(" + ongoingTouches[idx].clientX + ", " + ongoingTouches[idx].clientY + ");");
        ctx.moveTo(ongoingTouches[idx].clientX-offset.x, ongoingTouches[idx].clientY-offset.y);
        console.log("ctx.lineTo(" + touches[i].clientX + ", " + touches[i].clientY + ");");
        ctx.lineTo(touches[i].clientX-offset.x, touches[i].clientY-offset.y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.stroke();
        
        ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
        console.log(".");
      } else {
        console.log("can't figure out which touch to continue");
      }
    }
  }
  function handleEnd(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    var offset = findPos(cnv)

    for (var i = 0; i < touches.length; i++) {
              if(touches[i].clientX-offset.x >0 && touches[i].clientX-offset.x < parseFloat(cnv.width) && touches[i].clientY-offset.y >0 && touches[i].clientY-offset.y < parseFloat(cnv.height)){
                    evt.preventDefault();
        var color = '#6A735A'
        var idx = ongoingTouchIndexById(touches[i].identifier);
            
        if (idx >= 0) {
          // ctx.lineWidth = 4;
          ctx.fillStyle = 'transparent';
          ctx.beginPath();
          ctx.moveTo(ongoingTouches[idx].clientX-offset.x, ongoingTouches[idx].clientY-offset.y);
          ctx.lineTo(touches[i].clientX-offset.x, touches[i].clientY-offset.y);
          ctx.fillRect(touches[i].clientX - 4-offset.x, touches[i].clientY - 4-offset.y, 8, 8); // and a square at the end
          ongoingTouches.splice(i, 1); // remove it; we're done
        } else {
          console.log("can't figure out which touch to end");
        }
      }
    }
  }

  const initialiseCanvas = () => {
    console.log('info: canvas init')
    showDrawingBoard()
    // cnv.addEventListener('pointerdown', beginDraw);
    // cnv.addEventListener('pointerup', endDraw);
    // cnv.addEventListener('pointermove', draw);
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
          prevCnvImg = img
          prevCtx.drawImage(img, 0, 0, cnv.width, cnv.height)
        }
      })

    })
  }
  const clearCanvas = () => {
    ctx.clearRect(0, 0, cnv.width, cnv.height)
  }
  const disableCanvas = () => {
    cnv.removeEventListener('pointerdown', beginDraw)
    cnv.removeEventListener('pointerup', endDraw)
    cnv.removeEventListener('pointermove', draw)
    cnv.removeEventListener('touchstart', handleStart)
    cnv.removeEventListener('touchend', handleEnd)
    cnv.removeEventListener('touchmove', handleMove)
    document.querySelector('#current-cnv').classList.add('hidden')
  }
  const saveCanvas = () => {
    if(prevCnvImg != null) {
      ctx.drawImage(prevCnvImg, 0, 0, cnv.width, cnv.height)
    }
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
        disableCanvas()
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
    disableCanvas()
  }


  let content
  let selecting = false
  let currHighlightRange, currHighlightBlock
  let selectionControls
  let postUrl = `${variables.strapi_url}/api/annotations`

  const showSelectionControls = (e) => {
    // e.stopPropagation()
    removeControls(e)
    console.log('info: showing controls')
    console.log(e.target)
    
    let targetNode = e.target
    let range = new Range()
    range.setStart(targetNode, 0)
    range.setEnd(targetNode, targetNode.childNodes.length)
    
    currHighlightBlock = e.target

    let text = e.target.innerText
    if(text.length > 0) {
      let rect = e.target.getBoundingClientRect()
      selectionControls.style.top = `calc(${rect.bottom}px + 0px)`
      selectionControls.style.left = "1.5rem"
      selectionControls['text'] = text
      document.body.appendChild(selectionControls)
    }    
    console.log('info: adding class')
    e.target.classList.add('highlight')
 
  }
  const removeControls = (e) => {
    console.log('info: removing controls')
    let controls = [
      document.querySelector('#selection-controls'),
    ]
    controls.forEach(control => {
      if(control !== null) {
        console.log('removing..')
        control.remove()
        document.getSelection().removeAllRanges()
      }
    })

    if(currHighlightBlock != null) {
      currHighlightBlock.classList.remove('highlight')
    }
    currHighlightRange = null
    currHighlightBlock = null

  }
  const submitAnnotation = () => {
    console.log('info: posting annotation')
    console.log(currHighlightBlock.innerText)
    const annotationData = {
      data: {
        targetText: currHighlightBlock.innerText,
        blockID: currHighlightBlock.id.split('_')[1],
        length: currHighlightBlock.innerText.length,
        content: content,
        startOffset: 0,
        story: story.id
      }
    }
    console.log(annotationData)
    removeControls()
    fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(annotationData)
    })
    .then(response => {
      if(currHighlightBlock != null) {
        currHighlightBlock.classList.remove('highlight')
      }
      currHighlightRange = null
      currHighlightBlock = null
    })
  }

  onMount(() => {
    const capture = document.querySelector('#capture')
    capture.style.top = `${document.body.offsetHeight}px`
  })

</script>


<div class="flex-1 flex flex-col align-items-center gap-y-4
            w-screen overflow-y-scroll bg-primary
            text-center select-none">
  
  
    <div bind:this={scrollWindow} class="overflow-y-scroll flex-1
                flex flex-col align-items-center gap-y-2
                font-display text-left
                mx-4">
      <div class="px-1 text-base border">
        {story.title}
      </div>
      <div class="relative flex-1 text-sm border flex flex-col select-text">
        <div bind:this={reader} id="reader"
            class="{(showAnnotationView == true) ?
                   'flex flex-col p-2 z-10' :
                   'flex flex-col p-2'}">
            {#each story.submission.blocks as block}
              <div class="flex flex-row gap-x-2">
              
                <div class="pt-0.5 hidden">
                  <svg class="w-4 h-4 stroke-accent" viewBox="10 10 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20C12 15.5817 15.5817 12 20 12V12C24.4183 12 28 15.5817 28 20V25.0909C28 25.9375 28 26.3608 27.8739 26.6989C27.6712 27.2425 27.2425 27.6712 26.6989 27.8739C26.3608 28 25.9375 28 25.0909 28H20C15.5817 28 12 24.4183 12 20V20Z" stroke="#000" stroke-width="1.2"/>
                  <path d="M17 19L23 19" stroke="#000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M20 23H23" stroke="#000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              
              
                <div class="relative mb-1 w-full">
                  {#if block.data.text}
                  <section data-content={block.data.text} id="{"target_"+block.id}" on:click={showSelectionControls}>{block.data.text}</section>
                  {/if}
                  {#if block.data.file}
                  <div class="self-center flex-initial object-contain">
                    <img  id="{"target_"+block.id}" src={block.data.file.url} alt={block.data.caption} />
                  </div>
                  {/if}

                  <section class="comment-view hidden z-30
                                  absolute text-primary
                                  w-full max-h-42" id={"comments-"+block.id}>
                    <div class="arrow-up"></div>
                    <div class="bg-accent p-2 flex flex-col flex-wrap gap-y-2
                                w-full overflow-y-scroll">
                      {#each story.annotations as annotation}
                      {#if annotation.blockID == block.id}
                      <section id={"anno-"+annotation.blockID}>
                        <p>{annotation.content}</p>
                      </section>
                      {/if}
                      {/each}
                    </div>
                  </section>
                </div>

                
              </div>
              
              
            
            {/each}
        </div>
        
        <!-- annotation view -->
        <section id="drawing-board"
          class="absolute left-0 top-0">
          <div id="current-cnv" 
          class="absolute left-0 top-0">
            <canvas bind:this={cnv}>
              your browser does not support the canvas
            </canvas>
          </div>
          <div class="absolute left-0 top-0">
            <canvas bind:this={prevCnv}>
              your browser does not support the canvas
            </canvas>
          </div>
        </section>
        <!-- annotation view end -->


        <div class="mt-auto ml-auto">
          <div class="flex flex-row">
          {#if selectionMode}
          <button>
            <Icon src="/icons/Comment - Highlight Icon.svg" alt="comment - highlight" />
          </button>
          <button on:click={() => { selectionMode = !selectionMode; showAnnotationView = true }}>
            <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
          </button>
          {:else if drawingMode}
          <button on:click={() => { drawingMode = true; initialiseCanvas(); }}>
            <Icon src="/icons/Comment - Draw Icon.svg"      alt="comment - draw" />
          </button>
          <!-- <button>
            <Icon src="/icons/Comment - Delete Icon.svg" alt="comment - delete" />
          </button> -->
          <button on:click={clearCanvas}>
            <Icon src="/icons/Comment - Delete Icon.svg" alt="comment - delete" />
          </button>
          <button on:click={saveCanvas}>
            <Icon src="/icons/Comment - Save Icon.svg" alt="comment - save" />
          </button>
          <button on:click={() => { drawingMode = !drawingMode; showAnnotationView = true; disableCanvas() }}>
            <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
          </button>
          {:else if openCommentCard}
          <button on:click={() => { drawingMode = true; showAnnotationView = false; initialiseCanvas(); }}>
            <Icon src="/icons/Comment - Draw Icon.svg"      alt="comment - draw" />
          </button>
          <button on:click={() => { selectionMode = true; showAnnotationView = false; clearCanvas() } }>
            <Icon src="/icons/Comment - Highlight Icon.svg" alt="comment - highlight" />
          </button>    
          <button on:click={() => { openCommentCard = !openCommentCard; showAnnotationView = true }}>
            <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
          </button>
          {:else if showAnnotationView}
          <button class="px-3 py-2 bg-black text-white"
                    on:click={() => { openCommentCard = !openCommentCard }}>
            Leave a Note
          </button>
          <button on:click={() => { showAnnotationView = false }}>
            <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
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
            <a href={"whatsapp://send?text="+shareTextWhatsapp} data-action="share/whatsapp/share">
              <Icon src="/icons/Share - WhatsApp Icon.svg" alt="share - whatsapp" />
            </a>
            <button on:click={captureScreen}>
              <Icon src="/icons/Share - Instagram Icon.svg" alt="share - instagram" />
            </button>
            <a href={"mailto:?subject=Read this story on The Reading Room&body="+shareTextEmail}>
              <Icon src="/icons/Share - Email Icon.svg" alt="share - email" />
            </a>
            <a href={"sms:?body="+shareTextEmail}>
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
        'flex-initial flex flex-row justify-between py-2 px-5 bg-accent text-primary' :
        'flex-initial flex flex-row justify-between py-2 px-5 bg-primary'}"
        style="border-top: black 1.5px solid;">
      <a href="/stories">
        {#if (openInfoCard || openShareCard)}
        <div class="w-6 h-6">
          <Icon src="/icons/Back Button - White.svg" alt="back icon" />
        </div>
        {:else}
        <div class="w-6 h-6">
          <Icon src="/icons/Back Button - Black.svg" alt="back icon" />
        </div>
        {/if}
      </a>
      <div>
        {#if (openInfoCard || openShareCard)}
        <div class="w-6 h-6" on:click={() => { openInfoCard = !openInfoCard; openShareCard = false }}>
          <Icon src="/icons/Info Button - White.svg" alt="info icon" />
        </div>
        {:else}
        <div class="w-6 h-6" on:click={() => { openInfoCard = !openInfoCard; openShareCard = false }}>
          <Icon src="/icons/Info Button - Black.svg" alt="info icon" />
        </div>
        {/if}
      </div>
      <div>
        {#if (openInfoCard || openShareCard)}
        <div class="w-6 h-6" on:click={() => { openShareCard = !openShareCard; openInfoCard = false }}>
          <Icon src="/icons/Share Button - White.svg" alt="share icon" />
        </div>
        {:else}
        <div class="w-6 h-6" on:click={() => { openShareCard = !openShareCard; openInfoCard = false }}>
          <Icon src="/icons/Share Button - Black.svg" alt="share icon" />
        </div>
        {/if}
    
      </div>
    </div>
  </section>
  
</div>

{#if selectionMode}
<section class="hidden">
  <span bind:this={selectionControls} id="selection-controls" class="select-none">
    <section class="arrow-up"></section>
    <main class="flex flex-col p-2 w-10/12
                text-primary bg-accent underline">
      <section>
        <textarea bind:value={content} class="bg-accent text-primary placeholder:text-primary focus:outline-none
                        overflow-hidden w-full"
                name="annotation" id="annotation" placeholder="Leave a comment"
                rows=2 cols=30 wrap="soft"></textarea>
      </section>
      <section class="flex flex-row-reverse items-center">
        <button on:click={submitAnnotation}>
          <Icon src="/icons/Highlight - Send Icon.svg" alt="send icon" />
        </button>
      </section>
    </main>
  </span>

</section>

{/if}

<div id="capture" class="hidden absolute left-0 px-2 bg-primary w-full flex flex-col gap-y-1 items-center">
  <h1 class="text-lg">The Reading Room</h1>
  <div class="h-52 w-52 pt-1 self-center">
    <img class="w-full h-full object-cover rounded-full
                border-2 border-accent" 
        src="/img/Main Illustration - Green.png" alt="home illustration" />
  </div>
  <h2 class="font-display font-semibold text-sm">{story.title}</h2>
  <p class="font-text text-sm">{story.description}</p>
</div>