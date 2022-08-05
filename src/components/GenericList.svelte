<script>
import theme from "$stores/theme";
import { createEventDispatcher, onMount } from "svelte";
import ConfirmModal from "./ConfirmModal.svelte";
import DeleteIcon from "./icons/DeleteIcon.svelte";

import SearchIcon from "./icons/SearchIcon.svelte";


export let listStore
export let title
export let filters
export let searchPlaceholder
export let showConfirmModal = true

let listStoreReactive = $listStore
$: listItems = $listStore.data
let loading = true
let searchQuery 

let openConfirmModal = false
let targetID = null

const dispatch = createEventDispatcher()

const filter = () => {
  console.log("filtering..")
  listItems = listStoreReactive.data.filter(item => {
    return filters.some(filter => item[filter] ? item[filter].includes(searchQuery.toLowerCase()) : false) 
  })
}

const confirmDeleteAction = (item) => {
  openConfirmModal = true
  targetID = item.id
}

const deleteItem = (ev) => {
  dispatch('delete', { id: ev.detail.id })
  resetConfirmModal()
}

const resetConfirmModal = () => {
  openConfirmModal = false
  targetID = null
}

onMount(() => {
  console.log("calling on mount")
  listStore.fetchNextPage()
  loading = false
})

</script>

<div class="border-t border-black px-6 py-2
flex flex-col gap-y-2
h-full">
  
  {#if title}
  <h1 class="font-display font-bold text-4xl">{title}</h1>
  {/if}

  <main class="flex flex-col align-items-center gap-y-4 h-full text-contrast min-h-full">
    <div
      class="flex flex-row justify-between
    w-full gap-x-base divide-x divide-black
    border border-contrast"
    >
      <input
        type="search"
        name="search-query"
        placeholder={searchPlaceholder}
        class="flex-1 py-1 bg-primary text-sm px-2 focus:outline-none placeholder:text-contrast"
        bind:value={searchQuery}
        on:input={filter}
      />
      <button class="w-8 h-8 bg-primary focus:outline-none stroke-contrast" on:click={filter}>
        <SearchIcon />
      </button>
    </div>
  
      <div class="flex flex-col gap-y-4 overflow-y-scroll pb-60">
          {#if loading}
              <video src="/img/loading-{$theme}.webm" autoplay loop muted />
          {:else if listItems.length > 0}
              {#each listItems as item}
                  <div class="px-3 py-3 w-full
                  border border-contrast border-1
                  text-left font-text
                  inline-flex flex-col gap-y-2
                  relative"
                  on:click={() => dispatch('visit', { item: item })}>
                  <div class="absolute top-0 right-0 pt-2 pr-2"
                    on:click|stopPropagation={() => confirmDeleteAction(item)}>
                    <DeleteIcon />
                  </div>
                    <slot {item}></slot>
                  </div>
              {/each}
          {:else if listItems.length == 0}
              <!-- <video src="/img/loading-{$theme}.webm" autoplay loop muted></video> -->
              <p class="font-display text-xs text-left">
                  It's is a bit lonely here. 
              </p>
          {/if}
      </div>
  </main>
</div>

{#if showConfirmModal}
<ConfirmModal 
open={openConfirmModal}
targetName={title.substring(0, title.length-1).toLowerCase()}
targetID={targetID}
on:confirm={deleteItem}
on:cancel={resetConfirmModal}
/>
{/if}