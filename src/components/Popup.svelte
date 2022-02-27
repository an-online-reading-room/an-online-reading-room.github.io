<script>
  import Icon from './Icon.svelte'

  export let popupElement
  export let storyName
  export let storyUrl
</script>

<section bind:this={popupElement} 
        class="font-text text-sm bg-accent text-primary relative">
  <a href={storyUrl}>
    <p class="underline text-primary">{storyName}</p>
  </a>
  <!-- <div class="absolute top-0 right-0 h-4 w-4">
    <Icon src="/icons/Close Icon - White.svg" alt="close icon" />
  </div> -->
</section>