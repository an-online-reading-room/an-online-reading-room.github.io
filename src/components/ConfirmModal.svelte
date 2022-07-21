<script>
import { createEventDispatcher } from "svelte";

import Modal from "./utils/Modal.svelte";

const dispatch = createEventDispatcher()

export let open = false
export let targetName 
export let targetID 

</script>

<Modal
isOpenModal={open}
showCloseButton={false}>

  <div class="flex flex-col gap-y-3">
    <div>
      <p class="font-bold font-text text-base">Are you sure you want to delete your {targetName}?</p>
      <p class="font-text text-base">We’ll miss it!</p>
    </div>
    <div class="flex flex-row justify-between">
      <button class="action-btn" on:click={() => dispatch('confirm', { id: targetID })}>Yes</button>
      <button class="action-btn" on:click={() => dispatch('cancel')}>No</button>
    </div>
  </div>


</Modal>

<style lang="postcss">
  .action-btn {
    @apply bg-primary text-black font-display text-sm py-2 px-8;
  }
</style>