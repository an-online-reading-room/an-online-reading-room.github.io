<script>

import { onMount } from "svelte";
import { append_hydration, createEventDispatcher } from "svelte/internal";
import Linkable from "./Linkable.svelte";
import { links } from "$stores/links";
import user from "$stores/user";

export let story 
let toolbar
let searchInput, searchQuery = '', linksValue 
let optionsContainer, filteredLinks = []
let selectedRange, selectedText
let block, source
let finished = false

let startOffset, endOffset

let dispatch = createEventDispatcher()

links.subscribe(value => linksValue = value)

onMount(() => {
  links.init()
})

const show = (event) => {
  console.log("showing")

  selectedRange = event.detail.range
  block = event.detail.block
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

const hide = () => {
  // if(finished === false) unwrap()
  const toHide = Array.from(toolbar.classList).includes('hidden') ? false : true
  if(toHide) toolbar.classList.add('hidden')
  searchQuery = null
  
  finished = false
}

const wrap = () => {
  console.log("wrapping")
  
  selectedText = selectedRange.extractContents()

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

const highlight = (target) => {
  console.log("highlighting")
  const mark = document.querySelector('span.soft-highlight.bg-opacity-25')
  mark.remove()

  // console.log("range :", range)

  const textNode = document.createTextNode(mark.innerHTML)
  selectedRange.insertNode(textNode)

  console.log("during highlight")
  console.log(startOffset)
  console.log(endOffset)

  // save link
  dispatch('linkend', {
    user: $user.id,
    target: Number(target),
    source: Number(source),
    blockID: block,
    startOffset: startOffset,
    endOffset: endOffset,
    length: Math.abs(endOffset - startOffset),
    content: mark.innerHTML
  })

  finished = true
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

const filterLinks = () => {
  if(searchQuery.length === 0) {
    filteredLinks = []
    return
  }

  filteredLinks = linksValue.filter(link => link.title.toLowerCase().includes(searchQuery.toLowerCase()))
}

const onClickLinkOption = (event) => {
  const target = event.target.dataset.story
  highlight(target)
  finished = false
  hide()
}

</script>

<div>
  <main id="tool-linker" 
  class="absolute hidden text-primary text-sm stroke-primary z-50" 
  bind:this={toolbar}>
    <div class="arrow-up"></div>
    <div class="bg-accent flex flex-row h-10 rounded">
      <svg class="stroke-current" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="7" stroke-width="1.5"/>
      <path d="M28 28L25 25" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
  
      <input 
      bind:this={searchInput} 
      bind:value={searchQuery} 
      on:input={filterLinks}
      type="text" name="search-query" id="search-query"
      placeholder="Search for a story"
      class="bg-accent text-primary rounded placeholder-primary focus:outline-none"
      
      >
    </div>
  
    {#if searchQuery != null && (filteredLinks.length) > 0}
    <ul id="options" bind:this={optionsContainer} 
    class="flex flex-col gap-y-2 px-2 py-2 justify-evenly bg-[#F7F6F5] text-black">
      
      {#each filteredLinks as link}
        <li class="cursor-pointer" data-story={link.id} on:click|capture={onClickLinkOption}>
          { link.title }
        </li>
      {/each}
    </ul>
    {/if}
  
  
  </main>

  <Linkable {story} on:selected={show} on:reset={hide}>
    
  </Linkable>
</div>
