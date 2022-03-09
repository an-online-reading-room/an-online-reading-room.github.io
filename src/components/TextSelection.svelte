<script>
  import { onMount } from "svelte";
  import Icon from './Icon.svelte'
  import { selection } from '../stores/selection'
  import { variables } from "../variables";

  export let readerID
  export let storyID
  let reader, content
  let currHighlightRange, currHighlightBlock
  let selectionControls
  let postUrl = `${variables.strapi_url}/api/annotations`

  const showSelectionControls = (e) => {
    e.stopPropagation()
    removeControls()
    console.log('info: showing controls')
    let targetNode = document.getSelection().anchorNode.parentNode
    let range = new Range()
    range.setStart(targetNode, 0)
    range.setEnd(targetNode, targetNode.childNodes.length)
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(range)
    let currSelection = document.getSelection()

    currHighlightRange = range
    currHighlightBlock = targetNode

    let text = currSelection.toString()
    if(text.length > 0) {
      let rect = currSelection.getRangeAt(0).getBoundingClientRect()
      selectionControls.style.top = `calc(${rect.bottom}px + 0px)`
      selectionControls.style.left = "1.5rem"
      selectionControls['text'] = text
      document.body.appendChild(selectionControls)
    }

    if(currHighlightRange != null) {
      console.log('info: adding class')
      console.log(currHighlightRange)
      document.getSelection().addRange(currHighlightRange)
      currHighlightBlock.classList.add('highlight')
    }
    
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
        story: storyID
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

  const pointerOnPopup = (e) => {
    console.log('info: pointer on popup')
    // console.log(currSelection)
    e.stopPropagation()
  }

  onMount(() => {
    // document.onselectstart = new Function("return false")
    // document.onmousedown = (e) => false
    // document.onclick = (e) => true

    reader = document.querySelector(`#${readerID}`)
    selectionControls.onpointerup = pointerOnPopup
    reader.onpointerdown = removeControls
    reader.onpointerup = showSelectionControls
    reader.ontouchend = showSelectionControls
    reader.ontouchstart = removeControls
    
    
  })

</script>

  
<section class="hidden">
  <span bind:this={selectionControls} id="selection-controls">
    <section class="arrow-up"></section>
    <main class="flex flex-col p-2 
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

