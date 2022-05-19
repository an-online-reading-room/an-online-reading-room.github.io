<script>
  import Header from "../components/Header.svelte";
  import { user } from "$lib/stores/user"

  import Icon from '../components/Icon.svelte'
  
</script>

<div class="flex flex-col align-items-center gap-y-4
            w-screen h-full bg-primary
            text-center">
  <Header></Header>

  <div class="h-52 w-52 pt-2 self-center">
    <img class="w-full h-full object-cover rounded-full
                border-2 border-accent" 
        src="/img/Main Illustration - Green.png" alt="home illustration" />
  </div>

 
  <div class="h-1/5 py-6 px-4 flex flex-col gap-y-2
              font-display text-contrast text-sm leading-4">
    <p class="font-display text-accent text-xl">Hi {$user.username}!</p>
    <p>The Reading Room is an online platform for location-based storytelling.</p>
    <p>Our contributors come from across the world.  Join us and tell us your story, or go forth and discover stories that could make you fall in love with where you live. </p>  
  </div>

  <div class="py-8 px-4
              font-display text-contrast text-xs">
    <p class="font-text">Are you a listener or a storyteller?</p>
    <div class="flex justify-evenly px-8 py-2">
      <a href="/stories">
        <button class="font-display text-sm px-4 py-2 bg-contrast text-primary">
          Listener
        </button>
      </a>
      <a href="/storyteller">
        <button class="font-display text-sm px-4 py-2 bg-contrast text-primary">
          Storyteller
        </button>
      </a>
    </div>
  </div>
</div>