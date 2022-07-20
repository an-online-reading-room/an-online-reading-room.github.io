<script>

import { onMount } from "svelte";
import { append_hydration, createEventDispatcher, onDestroy } from "svelte/internal";
import Linkable from "./Linkable.svelte";
import { links } from "$stores/links";
import user from "$stores/user";
import SearchIcon from "./icons/SearchIcon.svelte";

export let story 
let container, toolbar, searchInput
let searchQuery = '', linksValue 
let optionsContainer, filteredLinks = []
let selectedRange
let blockID, source = story.id

let startOffset, endOffset

let selectionChangeListener

let dispatch = createEventDispatcher()

const linksUnsubscribe = links.subscribe(value => linksValue = value)

onMount(() => {
  links.init()
})

onDestroy(() => linksUnsubscribe)

const showToolbar = (event) => {
  console.log("linker: init")


  removeMark()
  
  blockID = event.detail.blockID
  selectionChangeListener = event.detail.selectionChangeListener

}

const moveToolbar = (event) => {

  const toShow = Array.from(toolbar.classList).includes('hidden') ? true : false
  if(toShow) toolbar.classList.remove('hidden')

  toolbar.style.left = `${2}rem`
  toolbar.style.top = `${event.detail.y + 12}px`

}

const updateSelectedRange = () => {
  console.log("linker: updating selection range")

  const selection = window.getSelection()
  const range = selection.getRangeAt(0)

  // selectedRange = document.createRange()
  // selectedRange.setStart(selection.anchorNode, selection.anchorOffset)
  // selectedRange.setEnd(selection.focusNode, selection.focusOffset)

  // console.log(range)
  selectedRange = range 
  startOffset = range.startOffset
  endOffset = range.endOffset

}

const linkHighlight = () => {
  const selectedText = selectedRange.extractContents()

  const mark = document.createElement('span')
  mark.classList.add('soft-highlight')
  mark.classList.add('bg-opacity-25')
  mark.classList.add('relative')
  mark.appendChild(selectedText)

  const clonedRange = selectedRange.cloneRange()
  clonedRange.insertNode(mark)

}

const removeSelectionChangeListener = () => {
  document.removeEventListener('selectionchange', selectionChangeListener)
}

const repositionToolbar = () => {
  
  const mark = document.querySelector('.soft-highlight')
  toolbar.style.top = null
  toolbar.style.left = null
  mark.appendChild(toolbar)

  searchInput.focus()
}

const createLink = (event) => {
  removeMark()
  
  const target = event.target.dataset.story
  highlight(target)
  
  hideToolbar()
}

const removeMark = () => {
  const mark = document.querySelector('span.soft-highlight.bg-opacity-25')
  if (mark) {
    // check if toolbar inside mark 
    const toolbar = mark.querySelector("#toolbar")
    if(toolbar) container.appendChild(toolbar)

    mark.remove()
    const textNode = document.createTextNode(mark.childNodes[0].textContent)
    selectedRange.insertNode(textNode)
  }

}

const highlight = (target) => {
  console.log("linker: saving link")
  const mark = document.querySelector('span.soft-highlight.bg-opacity-25')

  console.log("during highlight")
  console.log(startOffset)
  console.log(endOffset)

  // save link
  dispatch('linkend', {
    user: $user.id,
    target: Number(target),
    source: Number(source),
    blockID: blockID,
    startOffset: startOffset,
    endOffset: endOffset,
    length: Math.abs(endOffset - startOffset),
    content: mark.childNodes[0].textContent
  })

}

const hideToolbar = () => {
  console.log("linker: hiding toolbar")

  const toHide = Array.from(toolbar.classList).includes('hidden') ? false : true
  // console.log(toHide)
  if(toHide) toolbar.classList.add('hidden')

  searchQuery = null
  
 
}

const filterLinks = () => {
  if(searchQuery.length === 0) {
    filteredLinks = []
    return
  }

  filteredLinks = linksValue.filter(link => link.title.toLowerCase().includes(searchQuery.toLowerCase()))
}

// NOTE : obsolete functions 
const show = (event) => {
  console.log("showing")

  selectedRange = event.detail.range
  blockID = event.detail.block
  source = story.id
  startOffset = selectedRange.startOffset
  endOffset = selectedRange.endOffset

  console.log("during show")
  console.log(startOffset)
  console.log(endOffset)
  
  // set position 
  const top = event.detail.pos.y
  toolbar.style.top = `${top + 12}px`
  toolbar.style.left = `${2}rem`
  toolbar.classList.remove('hidden')

  
  wrap()
  searchInput.focus()
  
  
}

const wrap = () => {
  console.log("wrapping")
  
  const selectedText = selectedRange.extractContents()

  const mark = document.createElement('span')
  mark.classList.add('soft-highlight')
  mark.classList.add('bg-opacity-25')
  mark.appendChild(selectedText)

  const clonedRange = selectedRange.cloneRange()
  clonedRange.insertNode(mark)

  // console.log(selectedRange)
  console.log("during wrapping")
  console.log(startOffset)
  console.log(endOffset)


}

const unwrap = () => {
  console.log("unwrapping")
  const mark = document.querySelector('span.soft-highlight.bg-opacity-25')
  if(mark !== null) {
    mark.remove()
    const textNode = document.createTextNode(mark.innerHTML)
    // console.log(range)
    selectedRange.insertNode(textNode)
  }


}

</script>

<div bind:this={container}>
  <main
  class="absolute hidden text-primary text-sm stroke-primary z-50" 
  id="toolbar"
  bind:this={toolbar}>
    <div class="arrow-up"></div>
    <div class="bg-accent flex flex-row h-10 rounded">
      <SearchIcon />
  
      <input 
      bind:this={searchInput} 
      bind:value={searchQuery} 
      on:input={filterLinks}
      on:click={removeSelectionChangeListener}
      on:click={linkHighlight}
      on:click={repositionToolbar}
      type="text" name="search-query" id="search-query"
      placeholder="Search for a story"
      class="bg-accent text-primary rounded placeholder-primary focus:outline-none"
      
      >
    </div>
  
    {#if searchQuery != null && (filteredLinks.length) > 0}
    <ul id="options" bind:this={optionsContainer} 
    class="flex flex-col gap-y-2 px-2 py-2 justify-evenly bg-[#F7F6F5] text-black">
      
      {#each filteredLinks as link}
        <li class="cursor-pointer" data-story={link.id} on:click|capture={createLink}>
          { link.title }
        </li>
      {/each}
    </ul>
    {/if}
  
  
  </main>

  <Linkable 
  {story} 
  on:selected={show} 
  on:reset={hideToolbar}
  on:linktouchstart={showToolbar}
  on:linkfalsestart={hideToolbar}
  on:linkselectionchange={moveToolbar}
  on:linkselectionchange={updateSelectedRange}
  >
  </Linkable>
</div>
