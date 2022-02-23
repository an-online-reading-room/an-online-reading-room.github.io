<script>
  import Header from "../../components/Header.svelte"

  let open = false
</script>

<div class="flex flex-col align-items-center gap-y-4
            w-screen h-screen bg-primary
            text-center">
  <Header></Header>
  <slot />
  
  <div class="flex flex-col divide-y">
    {#if open}
    <div class="absolute inset-x-0 bottom-8
                flex flex-col gap-y-6
                w-full h-2/5 px-6 py-6
                bg-accent">
      <div class="flex flex-row justify-between
                  divide-x divide-primary w-full border border-primary
                  bg-accent gap-x-base">
        <input type="text" name="search-query" placeholder="Enter a location"
              class="flex-1 py-1 bg-accent text-sm px-2 text-primary
                      placeholder:text-primary focus:outline-none" >
        <button class="w-8 h-8 text-primary focus:outline-none" >
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="19" cy="19" r="7" stroke="#EEE2D2" stroke-width="1.5"/>
          <path d="M28 28L25 25" stroke="#EEE2D2" stroke-width="1.5" stroke-linecap="round"/>
          </svg>

        </button>
      </div>

      <div class="flex flex-row justify-between
                  divide-x divide-primary w-full border border-primary
                  bg-accent gap-x-base">
        <input type="text" name="search-query" placeholder="Enter a tag/topic"
              class="flex-1 py-1 bg-accent text-sm px-2 text-primary
                    placeholder:text-primary focus:outline-none " >
        <button class="w-8 h-8 text-primary focus:outline-none" >
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="19" cy="19" r="7" stroke="#EEE2D2" stroke-width="1.5"/>
          <path d="M28 28L25 25" stroke="#EEE2D2" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="flex flex-row flex-wrap gap-y-4 gap-x-6
                  text-sm text-primary">
        <div class="border border-primary py-1 px-2">
          Bangalore
        </div>
        <div class="border border-primary py-1 px-2">
          Delhi
        </div>
        <div class="border border-primary py-1 px-2">
          Hyderabad
        </div>
        <div class="border border-primary py-1 px-2">
          Playgrounds
        </div>
        <div class="border border-primary py-1 px-2">
          Monsoon
        </div>
        <div class="border border-primary py-1 px-2">
          Love
        </div>
      </div>

    </div>
    {/if}

    <button 
            on:click={() => open = !open}
            class="{open ? 
                'absolute inset-x-0 bottom-0 w-full h-8 focus:outline-none bg-accent text-primary' : 
                'absolute inset-x-0 bottom-0 w-full h-8 focus:outline-none bg-primary'}">
      Filters
    </button>
  </div>

</div>

