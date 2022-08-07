<script>
import { createEventDispatcher, onMount } from "svelte";

const dispatch = createEventDispatcher()

  export let popupElement
  export let story
  export let url

</script>

<section bind:this={popupElement} 
        class="text-center 
              font-text text-sm flex flex-col gap-y-2
              bg-accent text-primary">
  <a class="underline underline-offset-2 font-text font-bold text-base text-primary" href={url} on:click={() => dispatch('visited')}>
    <p>{story.title}</p>
  </a>

  <div class="font-text text-xs">
    <p>by {story.user.username}</p>
    <p>at {story.location}</p>
  </div>
</section>
