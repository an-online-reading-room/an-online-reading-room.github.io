<script>
  import Icon from './Icon.svelte'

  export let popupElement
  export let storyName
  export let storyUrl
</script>

<section bind:this={popupElement} 
        class="text-center 
              font-text text-sm leading-4
              bg-accent text-primary relative">
  <a href={storyUrl}>
    <p class="underline text-primary">{storyName}</p>
  </a>

  <p>You have already viewed this story</p>

  <a href={storyUrl}>
    <button class="px-3 py-2 bg-black text-white font-display">
      Visit the story again!
    </button>
  </a>
</section>