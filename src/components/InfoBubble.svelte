<script>
  
export let open = false

</script>


{#if open}
<div class="z-100 absolute top-0 left-0 w-full h-full">
  <div class="absolute bottom-16 left-8 w-full 
  flex justify-center">
    <button class="bg-primary rounded-full p-2">
      <p class="text-accent text-sm">link copied!</p>
    </button>
  </div>
</div>
{/if}