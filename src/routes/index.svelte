<script>
  import Header from "$components/Header.svelte";
</script>


<Header></Header>
<section class="flex flex-col justify-center items-center 
            w-screen h-full bg-cover
            text-center">


  <div class="h-2/5 w-full flex flex-col items-center justify-start">
    <div class="bg-white w-4/6
      rounded-lg flex flex-col items-center">
      <div class="w-full py-3
                  flex flex-col justify-around gap-y-6
                  font-display text-contrast text-xs">
        <p class="font-text text-base">Choose a version!</p>
        <div class="flex flex-col justify-between gap-y-2">
          <a href="/landing">
            <button class="font-display text-sm px-4 py-2 bg-accent text-white w-1/2">
              Lite
            </button>
          </a>
          <a href="/landing">
            <button class="font-display text-sm px-4 py-2 bg-accent text-white w-1/2">
              Adventure
            </button>
          </a>
          <a href="/">
            <button class="font-display text-sm px-4 py-2 bg-accent text-white w-1/2">
              Outdoors
            </button>
          </a>
        </div>
      </div>
      <p class="text-xxs">Turn on GPS for best experience.</p>
    </div>
  </div>
</section>

<style>
  section {
    background-image: url("/img/Main Illustration - Green.png");  
  }
</style>