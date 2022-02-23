<script>
  import Header from "../components/Header.svelte";
</script>

<div class="flex flex-col align-items-center gap-y-4
            w-screen h-screen bg-base
            text-center">
  <Header></Header>

  <div class="h-36 w-36 py-2 self-center">
    
  </div>

  <div class="h-1/5 py-6 px-4 flex flex-col gap-y-2
              font-display text-sm leading-4">
    <p>The Reading Room is an online platform for location-based storytelling.</p>
    <p>Our contributors come from across the world.  Join us and tell us your story, or go forth and discover stories that could make you fall in love with where you live. </p>  
  </div>

  <div class="py-8 px-4
              font-display text-xs">
    <p class="font-text">Are you a listener or a storyteller?</p>
    <div class="flex justify-evenly px-8 py-2">
      <a href="/stories">
        <button class="font-display text-sm px-4 py-2 bg-black text-white">
          Listener
        </button>
      </a>
      <a href="/storybuilder">
        <button class="font-display text-sm px-4 py-2 bg-black text-white">
          Storyteller
        </button>
      </a>
    </div>
  </div>
</div>