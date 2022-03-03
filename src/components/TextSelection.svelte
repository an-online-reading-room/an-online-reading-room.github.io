<script>
  import { onMount } from "svelte";
  import Icon from './Icon.svelte'
  import { selection } from '../stores/selection'

  export let readerID
  export let storyID
  let reader, content, currSelection
  let selectionControls, annotationTextControl
  let postUrl = 'https://reading-room-backend.herokuapp.com/api/annotations'

  selection.subscribe(value => currSelection = value)


  const showSelectionControls = (e) => {
    e.stopPropagation()
    console.log('info: showing controls')
    let currSelection = document.getSelection()
    selection.set(currSelection)
    let text = currSelection.toString()
    if(text.length > 0) {
      let rect = currSelection.getRangeAt(0).getBoundingClientRect()
      selectionControls.style.top = `calc(${rect.bottom}px + 0px)`
      selectionControls.style.left = "1.5rem"
      selectionControls['text'] = text
      document.body.appendChild(selectionControls)
    }
  }
  const removeControls = (e) => {
    e.stopPropagation()
    console.log('info: removing controls')
    let controls = [
      document.querySelector('#selection-controls'),
      document.querySelector('#selection-text-annotation')
    ]
    controls.forEach(control => {
      if(control !== null) {
        console.log('removing..')
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

  const submitAnnotation = () => {
    console.log('info: posting annotation')
    console.log(currSelection)
    const annotationData = {
      data: {
        targetText: currSelection.toString(),
        blockID: currSelection.anchorNode.parentNode.id,
        length: currSelection.toString().length,
        content: content,
        startOffset: currSelection.anchorOffset,
        story: storyID
      }
    }
    console.log(annotationData)
    fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(annotationData)
    })
  }

  const pointerOnPopup = (e) => {
    console.log('info: pointer on popup')
    console.log(currSelection)
    e.stopPropagation()
  }

  onMount(() => {
    reader = document.querySelector(`#${readerID}`)
    selectionControls.onpointerup = pointerOnPopup　
    reader.onpointerup = showSelectionControls
    reader.onpointerdown = removeControls
    
    
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

  <div bind:this={annotationTextControl} id="selection-text-annotation">
    <main style="background-color: red">
      <input  type="text" name="annotation" id="annotation">
      <button>annotate</button>
    </main>
  </div>
</section>

