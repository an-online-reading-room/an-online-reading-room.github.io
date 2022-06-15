<script>
import Linker from "$components/Linker.svelte";
import { createEventDispatcher } from "svelte";

export let story
const dispatch = createEventDispatcher()

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
    <p
    data-blockid={block.id}
    on:mouseup|capture={select} 
    on:mousedown|capture={reset}
    on:touchend|capture={select}
    on:touchstart|capture={reset}
    >
      {block.data.text}
    </p>
    {/each}
  </main>
</div>