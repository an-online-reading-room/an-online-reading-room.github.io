<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
import CloseIcon from "./icons/CloseIcon.svelte";
  
  export let isOpenModal = false;
  export let name;
  export let isVisited = false;
  let modalStoreUnsubscribe 

  const dispatch = createEventDispatcher();
  function closeModal() {
      isOpenModal = false;
      dispatch("closeModal", { isOpenModal });
  }
  onMount(() => {
  })

</script>

{#if isOpenModal}
<div
  id="background"
  class="fixed h-screen w-screen z-10 left-0 top-0"
  
  on:click={closeModal}>
  <div
      id="modal"
      class="fixed w-full px-6 top-1/2 left-1/2 z-20 "
      >
      <div class="font-text text-left text-sm bg-accent text-primary py-4 pl-4 pr-12 rounded shadow-xl">
          <slot></slot>
      </div>

      <button class="fixed top-3 right-9 w-6 h-6 focus:outline-none ml-auto text-primary" on:click={closeModal}>
          <CloseIcon />
      </button>
  </div>
</div>
{/if}

<style>
  #background {
      
  }
  #modal {
      
      transform: translate(-50%, -50%);
  }
</style>