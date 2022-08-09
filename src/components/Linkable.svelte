<script>
import { browser } from "$app/env";

import { createEventDispatcher, onMount } from "svelte";

export let story
const dispatch = createEventDispatcher()

const showTool = (event) => {
  document.removeEventListener('selectionchange', moveTool)


  const blockID = event.target.dataset.blockid

  if(browser) {
    document.addEventListener('selectionchange', moveTool)
  }


 
  dispatch("linktouchstart", { 
    blockID, 
    selectionChangeListener: moveTool 
  })


}

const moveTool = (event) => {

  const selection = document.getSelection()
  if(selection.isCollapsed === true) {
    console.log("linker: selection range is collapsed.")
    document.removeEventListener('selectionchange', moveTool)
    dispatch("linkfalsestart")
    return
  } 



  const range = selection.getRangeAt(0)
  const boundingRect = range.getBoundingClientRect()

  dispatch("linkselectionchange", { y: boundingRect.y+boundingRect.height })
}

// NOTE : obsolete functions 
const select = (event) => {
  // fires on every mouse click
  let pos 
  if(event instanceof MouseEvent) {
    pos = { x: event.clientX, y: event.clientY }
  } else if(event instanceof TouchEvent) {
    pos = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }
  }
  
  const selection = document.getSelection() 
  

  const textNode = event.target.firstChild
  const range = document.createRange()
  range.setStart(textNode, selection.anchorOffset)
  range.setEnd(textNode, selection.focusOffset)

  console.log("!!!!!!!!!!!!!!!!!!")
  console.log(range.startOffset)
  console.log(range.endOffset)
  // console.log(selection.anchorOffset)
  // console.log(selection.anchorNode)
  // console.log(selection.focusOffset)
  // console.log(selection.focusNode)
  // console.log(event.target.children[0])

  if(range.collapsed === false) {
    console.log("dispatching")
    dispatch('selected', { 
      range, 
      pos,
      source: story.id,
      block: event.target.dataset.blockid
    })
  } else {
    console.log("range is collapsed")
  }
}


const reset = () => {
  dispatch('reset')
}
</script>

<div>
  <main>
    {#each story.submission.blocks as block}
      {#if block.type == "paragraph"}
          <p 
          data-blockid={block.id}
          on:touchstart={showTool}>
          {@html block.data.text}
          </p>
      {:else if block.type == "image"}
          <img class="w-full" src={block.data.file.url} alt={block.data.file.caption}/>
      {/if}
    {/each}
  </main>
</div>