<script>

let dice = Math.floor(Math.random()*3)

</script>



<main class="text-left text-primary pt-8">

  <section class="px-8 py-3 font-display text-3xl
  border-t border-b border-primary">
    <h1>Take a break.</h1>
    <h1>Head outdoors!</h1>
  </section>

  <section>
    {#if dice == 0}
    <img src="/img/rest-cycle.png" alt="">
    {:else if dice == 1}
    <img src="/img/rest-park-bench.png" alt="">
    {:else if dice == 2}
    <img src="/img/rest-tea-stall.png" alt="">
    {/if}
  </section>

  <section class="px-8 py-3 text-sm
  border-t border-b border-primary">
    <p>Stop scrolling! </p>
    <p>Drink some tea, sit outside, or explore!</p>
  </section>

</main>

  