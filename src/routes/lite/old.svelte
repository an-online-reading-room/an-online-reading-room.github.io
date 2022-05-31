<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import { flattenStrapiResponse } from '$lib/utils/api'

  export const load: Load = async ({ params, fetch, session, stuff }) => {
    const strapiRes = await (await fetch(`${variables.strapi_url}/api/stories?slug=${params.slug}`)).json()
    
    const data = flattenStrapiResponse(strapiRes)
    return { props: { story: data } }
      
  };
</script>

<script >
  import { browser } from '$app/env';
  import Icon from '$components/Icon.svelte'
  import { variables } from '$lib/variables';
  import theme from '$stores/theme';
  import html2canvas from 'html2canvas'
  
  export let story
  let reader, scrollWindow, cnv, prevCnv
  let showAnnotationView = false
  let selectionMode = false

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
        if(comment.id != `comments-${annotation.blockID}` && !Array.from(comment.classList).includes('hidden')) {
          comment.classList.add('hidden')
        }
      })

      const comment = document.querySelector(`section#comments-${annotation.blockID}`)
      comment.classList.remove('hidden')
    })
  
  }
  const hideAnnotation = (annotation) => {
    const block = document.querySelector(`section#target_${annotation.blockID}`)
    block.innerHTML = block.dataset.content
    block.classList.remove('highlight')
    const comment = document.querySelector(`section#comments-${annotation.blockID}`)
    comment.classList.add('hidden')
    block.parentElement.previousElementSibling.classList.add('hidden') // svg
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
    content = ''
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


<div class="flex-1 flex flex-col gap-y-4 py-4
            w-screen overflow-y-scroll bg-primary
            text-center text-contrast select-none">
  
  
    <div bind:this={scrollWindow} class="relative overflow-y-scroll flex-1
                flex flex-col align-items-center gap-y-2
                font-display text-left
                mx-4">
      <div class="px-1 text-base border">
        {story.title}
      </div>
      <div class="relative flex-1 overflow-hidden overflow-y-scroll text-sm border flex flex-col select-text">
        <div bind:this={reader} id="reader"
            class="{(showAnnotationView == true) ?
                   'flex flex-col pb-12 p-2 z-10' :
                   'flex flex-col pb-12 p-2'}">
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
                    <div class="theme-{$theme} arrow-up"></div>
                    <div class="bg-accent p-2 flex flex-col flex-wrap gap-y-2
                                w-full overflow-y-scroll">
                      <!-- {#each story.annotations as annotation}
                      {#if annotation.blockID == block.id}
                      <section id={"anno-"+annotation.blockID}>
                        <p>{annotation.content}</p>
                      </section>
                      {/if}
                      {/each} -->
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

      </div>
      <div class="absolute bottom-0 right-0 z-50">
        <div class="flex flex-row">
        {#if selectionMode}
        <button>
          <Icon src="/icons/Comment - Highlight Icon.svg" alt="comment - highlight" />
        </button>
        <button on:click={() => { selectionMode = !selectionMode; showAnnotationView = true }}>
          <Icon src="/icons/Comments - Close Icon.svg"    alt="comment - close" />
        </button>
        
        
        {:else if showAnnotationView}
        <button class="px-3 py-2 bg-black text-white"
                  on:click={() => { openCommentCard = !openCommentCard }}>
          Leave a Note
        </button>
        <button on:click={(e) => { showAnnotationView = false; removeControls(e) }}>
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
  

  <section class="z-60">
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
            <a href={"whatsapp://send?text="+shareTextWhatsapp} data-action="share/whatsapp/share"
              class="stroke-primary fill-primary">
              
                <svg width="40" height="40" class="stroke-current" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.5"/>
                <path class="fill-current" d="M20.0004 10C17.6695 9.99659 15.411 10.8085 13.6159 12.2953C11.8209 13.7821 10.6024 15.85 10.172 18.1407C9.74128 20.4314 10.1255 22.8006 11.2581 24.8376L10.0261 29.1504C9.98237 29.3035 9.99487 29.4672 10.0614 29.6118C10.1279 29.7565 10.244 29.8726 10.3886 29.9391C10.5333 30.0056 10.697 30.0181 10.8501 29.9743L15.1629 28.7423C16.9489 29.7307 18.9946 30.1487 21.0255 29.94C23.056 29.7313 24.9737 28.9059 26.5215 27.5749C28.0692 26.2438 29.1722 24.4709 29.6823 22.4945C30.1925 20.5181 30.0853 18.4327 29.3752 16.5188C28.665 14.6051 27.386 12.9546 25.7102 11.7892C24.0343 10.6238 22.0417 9.99943 20.0004 10L20.0004 10ZM20.0004 28.667C18.4478 28.6646 16.9246 28.2446 15.5904 27.4509C15.4325 27.3577 15.2432 27.3336 15.067 27.3842L11.6376 28.3643L12.6176 24.9336C12.6683 24.7574 12.6442 24.5681 12.5509 24.4102C11.5796 22.7652 11.1795 20.8453 11.4128 18.9492C11.646 17.053 12.4997 15.2874 13.841 13.927C15.182 12.5666 16.9354 11.6879 18.8281 11.4276C20.7205 11.1672 22.646 11.5399 24.3047 12.4877C25.9634 13.4355 27.2621 14.9052 27.9987 16.6676C28.7352 18.4303 28.8683 20.387 28.3771 22.233C27.886 24.0792 26.7982 25.7112 25.2832 26.8746C23.7681 28.0383 21.9108 28.6682 20.0004 28.6666L20.0004 28.667Z" />
                <path class="fill-current" d="M25.5271 22.292C25.5064 22.274 23.1671 20.5492 22.3743 20.6873C21.9743 20.758 21.7583 21.0161 21.3983 21.4447C21.3356 21.5186 21.2836 21.578 21.2397 21.6307C21.1249 21.5874 20.9843 21.5287 20.823 21.4506C19.8317 20.9683 19.031 20.1672 18.549 19.176C18.471 19.0153 18.4124 18.8747 18.3689 18.7599C18.4222 18.7132 18.485 18.6605 18.5555 18.6006C18.9835 18.2419 19.2416 18.0252 19.3122 17.6245C19.4502 16.8358 17.7256 14.4911 17.7076 14.4718V14.4719C17.5037 14.1938 17.1853 14.0224 16.8409 14.0052C16.0149 14.0052 14.0049 16.5572 14.0049 17.1547C14.0049 17.258 14.0402 19.7348 17.1316 22.8809C20.2663 25.9614 22.7431 26.0001 22.8471 26.0001C23.4444 26.0001 25.9998 23.9867 25.9998 23.1608C25.9819 22.8145 25.8081 22.495 25.5272 22.292L25.5271 22.292ZM22.7464 24.6527C22.2764 24.5941 20.3983 24.2213 18.0724 21.936C15.7682 19.5906 15.3996 17.7055 15.3463 17.2545C15.7747 16.6198 16.2631 16.0278 16.805 15.4864C17.2227 16.0922 17.5995 16.7253 17.9329 17.3812C17.859 17.4479 17.7663 17.524 17.7002 17.5812C17.47 17.7559 17.2597 17.9559 17.0736 18.1773L16.9109 18.4039L16.959 18.6792C17.0444 19.0542 17.1761 19.4173 17.3509 19.7599C17.9645 21.02 18.9828 22.038 20.2429 22.6513C20.5855 22.8266 20.9485 22.9584 21.3236 23.044L21.5989 23.0913L21.825 22.93C22.0464 22.7437 22.2465 22.5336 22.4217 22.3032C22.4803 22.2333 22.555 22.1425 22.6217 22.0705V22.0706C23.2777 22.4031 23.9105 22.779 24.5163 23.1959C23.9742 23.7368 23.3815 24.2247 22.7464 24.6526V24.6527Z"/>
                </svg>
              
            </a>
            <button on:click={captureScreen} class="stroke-primary fill-primary">
              <svg class="stroke-current" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19.5" />
              <path class="fill-current" d="M26.6667 10H13.3333C12.4492 10 11.6014 10.3511 10.9763 10.9763C10.3511 11.6014 10 12.4492 10 13.3333V26.6667C10 27.5508 10.3511 28.3986 10.9763 29.0237C11.6014 29.6489 12.4492 30 13.3333 30H26.6667C27.5508 30 28.3986 29.6489 29.0237 29.0237C29.6489 28.3986 30 27.5508 30 26.6667V13.3333C30 12.4492 29.6489 11.6014 29.0237 10.9763C28.3986 10.3511 27.5508 10 26.6667 10V10ZM28.3334 26.6667H28.3333C28.3333 27.1086 28.1578 27.5326 27.8452 27.8451C27.5327 28.1577 27.1087 28.3332 26.6667 28.3332H13.3333C12.8913 28.3332 12.4673 28.1577 12.1548 27.8451C11.8422 27.5326 11.6667 27.1086 11.6667 26.6667V13.3332C11.6667 12.8912 11.8422 12.4673 12.1548 12.1548C12.4673 11.8421 12.8913 11.6666 13.3333 11.6666H26.6667C27.1087 11.6666 27.5327 11.8421 27.8452 12.1548C28.1578 12.4673 28.3333 12.8912 28.3333 13.3332L28.3334 26.6667Z" />
              <path class="fill-current" d="M20 14.9999C18.6739 14.9999 17.4022 15.5267 16.4644 16.4644C15.5268 17.4021 15 18.6739 15 19.9999C15 21.3259 15.5268 22.5977 16.4644 23.5354C17.4022 24.4731 18.6739 24.9999 20 24.9999C21.326 24.9999 22.5977 24.4731 23.5355 23.5354C24.4731 22.5977 24.9999 21.3259 24.9999 19.9999C24.9999 18.6739 24.4731 17.4021 23.5355 16.4644C22.5977 15.5267 21.326 14.9999 20 14.9999V14.9999ZM20 23.3331C19.1159 23.3331 18.2681 22.982 17.643 22.3568C17.0178 21.7317 16.6667 20.8839 16.6667 19.9998C16.6667 19.1158 17.0178 18.268 17.643 17.6428C18.2681 17.0177 19.1159 16.6666 20 16.6666C20.884 16.6666 21.7318 17.0177 22.3569 17.6428C22.9821 18.268 23.3332 19.1158 23.3332 19.9998C23.3332 20.8839 22.9821 21.7317 22.3569 22.3568C21.7318 22.982 20.884 23.3331 20 23.3331Z" />
              <path class="fill-current" d="M26.667 14.5832C26.667 15.2736 26.1073 15.8332 25.417 15.8332C24.7266 15.8332 24.167 15.2736 24.167 14.5832C24.167 13.8929 24.7266 13.3332 25.417 13.3332C26.1073 13.3332 26.667 13.8929 26.667 14.5832Z" />
              </svg>
                
            </button>
            <a href={"mailto:?subject=Read this story on The Reading Room&body="+shareTextEmail} class="stroke-primary fill-primary">
              <svg class="stroke-current" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19.5" />
              <path class="fill-current" d="M10 14V26.6996H30V14H10ZM20 22.1079L11.9284 15.0528H28.0723L20 22.1079ZM16.3891 20.3497L11.0529 25.0141V15.6855L16.3891 20.3497ZM17.189 21.0492L20 23.5058L22.8109 21.0492L28.0716 25.6473H11.9285L17.189 21.0492ZM23.6108 20.3501L28.9478 15.686V25.0147L23.6108 20.3501Z" />
              </svg>
            </a>
            <a href={"sms:?body="+shareTextEmail} class="stroke-primary fill-primary">
              <svg class="stroke-current" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19.5"/>
              <path class="fill-current" d="M20.3211 21.4393C20.3211 21.8552 19.984 22.1921 19.5683 22.1921C19.1526 22.1921 18.8154 21.8552 18.8154 21.4393C18.8154 21.0235 19.1526 20.6866 19.5683 20.6866C19.984 20.6866 20.3211 21.0235 20.3211 21.4393Z" />
              <path class="fill-current" d="M16.9588 21.4393C16.9588 21.8552 16.6217 22.1921 16.206 22.1921C15.7901 22.1921 15.4531 21.8552 15.4531 21.4393C15.4531 21.0235 15.7901 20.6866 16.206 20.6866C16.6217 20.6866 16.9588 21.0235 16.9588 21.4393Z" />
              <path class="fill-current" d="M13.5964 21.4393C13.5964 21.8552 13.2594 22.1921 12.8435 22.1921C12.4278 22.1921 12.0908 21.8552 12.0908 21.4393C12.0908 21.0235 12.4278 20.6866 12.8435 20.6866C13.2594 20.6866 13.5964 21.0235 13.5964 21.4393Z" />
              <path class="fill-current" d="M10.7603 27.5872H15.8293L21.5506 31L21.2746 27.6122H21.6509C23.1064 27.6122 24.3108 26.4831 24.4114 25.0526L27.7238 27.0099L27.4478 23.6222L27.8241 23.6224C29.3548 23.6224 30.5845 22.3927 30.5845 20.862V13.7604C30.5845 12.2297 29.3549 11 27.8241 11L16.9334 11.0002C15.4027 11.0002 14.173 12.2298 14.173 13.7606L14.1732 14.965H10.7604C9.22969 14.965 8 16.2197 8 17.7253V24.8268C8 26.3575 9.22964 27.5872 10.7604 27.5872L10.7603 27.5872ZM15.2018 13.7605C15.2018 12.8069 15.9796 12.029 16.9333 12.029H27.824C28.7776 12.029 29.5555 12.8069 29.5555 13.7605V20.8621C29.5555 21.8157 28.7777 22.5936 27.824 22.5936H26.3435L26.5443 25.128L24.4112 23.8734V17.7254C24.4112 16.1946 23.1816 14.965 21.6508 14.965L15.2017 14.9651L15.2018 13.7605ZM9.0287 17.7254C9.0287 16.7718 9.80656 15.9939 10.7602 15.9939H21.6509C22.6045 15.9939 23.3825 16.7717 23.3825 17.7254V24.8269C23.3825 25.7805 22.6046 26.5584 21.6509 26.5584H20.1704L20.3712 29.0929L16.1053 26.5584H10.7603C9.80672 26.5584 9.02881 25.7806 9.02881 24.8269L9.0287 17.7254Z" />
              </svg>
            </a>
            <a href={window.location.href} on:click={copyPageLink} class="stroke-primary fill-primary">
              <svg class="stroke-current" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19.5" />
              <path class="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M27.6748 14.103C26.9712 13.3969 26.0154 13 25.0186 13C24.0218 13 23.066 13.3969 22.3623 14.103L23.2498 14.9905C23.8829 14.3574 24.8055 14.1102 25.6703 14.3419C26.535 14.5736 27.2104 15.249 27.4421 16.1138C27.6739 16.9785 27.4266 17.9012 26.7936 18.5342L21.7936 23.5342C21.1617 24.1672 20.2401 24.4151 19.3759 24.1843C18.5117 23.9536 17.8363 23.2793 17.604 22.4156C17.3717 21.5518 17.6179 20.6297 18.2498 19.9967L19.1311 19.1092L18.2498 18.2217L17.3623 19.1092C16.6563 19.8128 16.2594 20.7686 16.2594 21.7655C16.2594 22.7623 16.6563 23.7181 17.3623 24.4217C18.0695 25.1198 19.0249 25.5087 20.0186 25.503C21.0193 25.5071 21.9802 25.111 22.6873 24.403L27.6873 19.403C29.1462 17.9354 29.1406 15.5636 27.6748 14.103V14.103ZM12.0123 25.3905C11.541 24.9213 11.276 24.2836 11.276 23.6186C11.276 22.9535 11.541 22.3159 12.0123 21.8467L17.0123 16.8467C17.4815 16.3753 18.1192 16.1104 18.7842 16.1104C19.4493 16.1104 20.0869 16.3753 20.5561 16.8467C21.0246 17.3197 21.2817 17.9623 21.2686 18.628C21.2724 19.2955 21.0091 19.9369 20.5373 20.4092L19.2123 21.753L20.0998 22.6405L21.4248 21.3155C22.8936 19.8467 22.8936 17.4654 21.4248 15.9967C19.9561 14.528 17.5748 14.528 16.1061 15.9967L11.1061 20.9967C10.3981 21.7006 10 22.6577 10 23.6561C10 24.6544 10.3981 25.6116 11.1061 26.3155C11.8179 27.0083 12.7754 27.3904 13.7686 27.378C14.7705 27.3789 15.7322 26.9835 16.4436 26.278L15.5561 25.3905C15.0869 25.8618 14.4493 26.1268 13.7842 26.1268C13.1192 26.1268 12.4815 25.8618 12.0123 25.3905V25.3905Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    {/if}
    <div
        class="{(openInfoCard || openShareCard) ?
        'flex-initial flex flex-row justify-between py-2 px-5 border-t border-primary bg-accent text-primary' :
        'flex-initial flex flex-row justify-between py-2 px-5 border-t border-contrast bg-primary text-contrast'}"
        >
      <a href="/stories">
        {#if (openInfoCard || openShareCard)}
        <div class="w-5 h-5 stroke-primary">
          <svg class="stroke-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.4" stroke-width="1.2"/>
          <path d="M7.25 10L12.2242 6" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M7.27588 10L12.2501 14" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </div>
        {:else}
        <div class="w-5 h-5 stroke-contrast">
          <svg class="stroke-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.4" stroke-width="1.2"/>
          <path d="M7.25 10L12.2242 6" stroke-width="1.2" stroke-linecap="round"/>
          <path d="M7.27588 10L12.2501 14" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </div>
        {/if}
      </a>
      <div>
        {#if (openInfoCard || openShareCard)}
        <div class="w-5 h-5 stroke-primary" on:click={() => { openInfoCard = !openInfoCard; openShareCard = false }}>
          <svg class="stroke-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.4" transform="rotate(-180 10 10)" stroke-width="1.2"/>
          <path d="M10.5 5.25C10.5 5.66421 10.1642 6 9.75 6C9.33579 6 9 5.66421 9 5.25C9 4.83579 9.33579 4.5 9.75 4.5C10.1642 4.5 10.5 4.83579 10.5 5.25Z" />
          <path d="M10 14V9.5C10 9.03501 10 8.80252 9.94889 8.61177C9.81019 8.09413 9.40587 7.68981 8.88823 7.55111C8.69748 7.5 8.46499 7.5 8 7.5V7.5M10 14H11.5M10 14H8.5" stroke-width="1.2"/>
          </svg>
        </div>
        {:else}
        <div class="w-5 h-5 stroke-contrast" on:click={() => { openInfoCard = !openInfoCard; openShareCard = false }}>
          <svg class="stroke-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.4" transform="rotate(-180 10 10)" stroke-width="1.2"/>
          <path d="M10.5 5.25C10.5 5.66421 10.1642 6 9.75 6C9.33579 6 9 5.66421 9 5.25C9 4.83579 9.33579 4.5 9.75 4.5C10.1642 4.5 10.5 4.83579 10.5 5.25Z" />
          <path d="M10 14V9.5C10 9.03501 10 8.80252 9.94889 8.61177C9.81019 8.09413 9.40587 7.68981 8.88823 7.55111C8.69748 7.5 8.46499 7.5 8 7.5V7.5M10 14H11.5M10 14H8.5" stroke-width="1.2"/>
          </svg>
        </div>
        {/if}
      </div>
      <div>
        {#if (openInfoCard || openShareCard)}
        <div class="w-5 h-5 stroke-primary" on:click={() => { openShareCard = !openShareCard; openInfoCard = false }}>
          <svg class="stroke-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.4" transform="rotate(-180 10 10)" stroke-width="1.2"/>
          <path d="M12.3333 5C11.4167 5 10.6666 5.72591 10.6666 6.61293C10.6666 6.79407 10.6976 6.96925 10.7552 7.13204L7.90112 8.92645C7.59546 8.59825 7.15626 8.38707 6.66668 8.38707C5.75009 8.38707 5 9.11298 5 10C5 10.887 5.75009 11.6129 6.66668 11.6129C7.15823 11.6129 7.60046 11.4041 7.90621 11.0735L10.7552 12.868C10.6966 13.0321 10.6666 13.2044 10.6666 13.3871C10.6666 14.2741 11.4167 15 12.3333 15C13.2499 15 14 14.2741 14 13.3871C14 12.5 13.2499 11.7741 12.3333 11.7741C11.8438 11.7741 11.4047 11.9853 11.0989 12.3135L8.24476 10.5191C8.30231 10.3562 8.33335 10.181 8.33335 10C8.33335 9.81728 8.30336 9.64504 8.24476 9.4809L11.0938 7.68648C11.3995 8.01705 11.8418 8.22586 12.3333 8.22586C13.2499 8.22586 14 7.49996 14 6.61293C14 5.72591 13.2499 5 12.3333 5Z" />
          </svg>
        </div>
        {:else}
        <div class="w-5 h-5 stroke-contrast" on:click={() => { openShareCard = !openShareCard; openInfoCard = false }}>
          <svg class="stroke-current" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.4" transform="rotate(-180 10 10)" stroke-width="1.2"/>
          <path d="M12.3333 5C11.4167 5 10.6666 5.72591 10.6666 6.61293C10.6666 6.79407 10.6976 6.96925 10.7552 7.13204L7.90112 8.92645C7.59546 8.59825 7.15626 8.38707 6.66668 8.38707C5.75009 8.38707 5 9.11298 5 10C5 10.887 5.75009 11.6129 6.66668 11.6129C7.15823 11.6129 7.60046 11.4041 7.90621 11.0735L10.7552 12.868C10.6966 13.0321 10.6666 13.2044 10.6666 13.3871C10.6666 14.2741 11.4167 15 12.3333 15C13.2499 15 14 14.2741 14 13.3871C14 12.5 13.2499 11.7741 12.3333 11.7741C11.8438 11.7741 11.4047 11.9853 11.0989 12.3135L8.24476 10.5191C8.30231 10.3562 8.33335 10.181 8.33335 10C8.33335 9.81728 8.30336 9.64504 8.24476 9.4809L11.0938 7.68648C11.3995 8.01705 11.8418 8.22586 12.3333 8.22586C13.2499 8.22586 14 7.49996 14 6.61293C14 5.72591 13.2499 5 12.3333 5Z" />
          </svg>
        </div>
        {/if}
    
      </div>
    </div>
  </section>
  
</div>

{#if selectionMode}
<section class="hidden">
  <span bind:this={selectionControls} id="selection-controls" class="select-none theme-{$theme}">
    <section class="theme-{$theme} arrow-up"></section>
    <main class="flex flex-col p-2 w-full
                text-menu-accent bg-accent underline popup">
      <section>
        <textarea bind:value={content} class="bg-accent text-menu-accent placeholder:text-menu-accent focus:outline-none
                        overflow-hidden w-full"
                name="annotation" id="annotation" placeholder="Leave a comment"
                rows=2 cols=30 wrap="soft"></textarea>
      </section>
      <section class="flex flex-row-reverse items-center">
        <button on:click={submitAnnotation} class="text-menu-primary">
          <svg class="stroke-menu-accent" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect class="fill-current" width="30" height="30" />
          <path class="theme-{$theme} stroke-color" d="M8.41412 9.65147L10.749 14.0294L10.749 14.0294C10.8719 14.2598 10.9333 14.375 10.9333 14.5C10.9333 14.625 10.8719 14.7402 10.749 14.9706L10.749 14.9706L8.41412 19.3485C7.82963 20.4445 7.53738 20.9924 7.78568 21.2539C8.03397 21.5153 8.59628 21.2517 9.7209 20.7246L21.0684 15.4055C21.9041 15.0137 22.322 14.8178 22.322 14.5C22.322 14.1822 21.9041 13.9863 21.0684 13.5945L9.72091 8.27542C8.59628 7.74826 8.03397 7.48467 7.78568 7.74613C7.53738 8.00759 7.82963 8.55555 8.41412 9.65147Z" stroke-width="1.2"/>
          </svg>
            
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