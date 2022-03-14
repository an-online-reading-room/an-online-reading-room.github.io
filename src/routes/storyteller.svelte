<script>
  import Header from '../components/Header.svelte'
  import Icon from '../components/Icon.svelte'
</script>

<div class="flex flex-col align-items-center gap-y-6
            w-screen bg-primary
            text-center">
  <Header></Header>
  
  <div class="h-52 w-52 pt-2 self-center">
    <img class="w-full h-full object-cover rounded-full
                border-2 border-accent" 
        src="/img/Main Illustration - Green.png" alt="home illustration" />
  </div>

  <main class="font-text text-sm text-contrast leading-4 px-6">
    <section class="flex flex-col gap-y-6">
      <div>
        <p>Welcome to</p>
        <p>The Reading Room!</p>
      </div>
      <div>
        <p>where you have full reign</p>
        <p>over your story…</p>
        <p>and the experience</p>
        <p>you create with it.</p>
      </div>
      <p>Go forth! Take us to your glorious sandbox.</p>
      <a href="/prompts">
        <p class="underline">What do I write about?</p>
      </a>
      <a href="/storybuilder">
        <p class="underline">I have a story to tell</p>
      </a>
    </section>

   
  </main>

</div>