<script>
  import Icon from '../components/Icon.svelte'
  import { version } from '../stores/version'
</script>

<div class="flex flex-col items-center
            w-screen h-full bg-primary
            px-6
            text-center">
  <div class="h-20 flex flex-col justify-center
              font-display">
    <h1 class="text-2xl">The Reading Room</h1>
  </div>

  <div class="h-36 w-36">
    <Icon src="/icons/Home Illustration.svg" alt="home illustration" />
  </div>

  <div class="h-1/5 px-10 py-6
              font-text text-xs leading-4
              flex flex-col gap-y-3">
    <p class="pt-2">We suggest you choose the</p>
    <a href="/landing" on:click={() => version.set('lite')}>
      <button class="font-display px-4 py-2 bg-black text-white">
        Lite Version
      </button>
    </a>
    <p class="pt-2">if you have low bandwidth for a smoother experience.</p>
  </div>

  <div class="py-8
              font-display text-xxs">
    
    <p>For best experience use the adventure version</p>
  </div>

  <div class="mt-auto pb-6
              font-display text-xs">
    <p>Turn on sound for a more immersive experience</p>
  </div>
</div>