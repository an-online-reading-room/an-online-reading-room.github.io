<script>
  import Header from '../components/Header.svelte'
</script>

<div class="flex flex-col align-items-center gap-y-6
            w-screen bg-primary h-full overflow-y-scroll
            text-center">
  <Header></Header>

  <main class="h-full overflow-y-scroll font-display text-sm text-contrast px-6 pb-4
                text-center leading-4
                flex flex-col gap-y-4">
    <section class="flex flex-col gap-y-3">
      <h1 class="font-bold">Prompts</h1>
      <p>While walking down a road, you may think, "this is where something happened," "I remember when we did this there," "this is the building where that event occurred," and so on...</p>
      <p>Here are some thoughts we’ve had about place to help you get started</p>
    </section>

    <section class="flex flex-col gap-y-3">
      <h1 class="font-bold">Nature, Climate Change, and the Environment</h1>
      <ul class="list-disc list-inside flex flex-col gap-y-3">
        <li>Have you noticed the changing landscapes: disappearing lakes, shrinking forests, rising water levels?</li>
        <li>Forest fires, floods, earthquakes, cyclones and the list goes on. As the world continues to brave such disasters, how can we learn and share from such experiences?</li>
        <li>Look for the birds in your neighbourhood. Collect their calls and share with us their names.</li>
      </ul>
    </section>
    
    <section class="flex flex-col gap-y-3">
      <h1 class="font-bold">Streets, Safety, Protest</h1>
      <ul class="list-disc list-inside flex flex-col gap-y-3">
        <li>Share with us your experience of walking home at night.</li>
        <li>Public places - libraries, parks, clubhouses - are meant to foster a diversity of engagement, host interests and amenities and spaces for events. The last time you attended an event held in a public place...</li>
        <li>The pandemic has only brought us together in witnessing and standing up to injustices across geographies. In the last two years, we’ve seen protests for and against various issues spreading like wildfire across the country. If you have been a part of, supported, captured and documented, or heard of incidents worth recounting, please share your story</li>
        <li>Take this chance to head outside for a cup of chai at the nearest tea stall. Ask the chaiwaala when he set up his stall, where he’s from, how COVID-19 has affected him?</li>
        <li>Speak to your auto driver or the next cab driver, you spend 30-minutes with, trying to beat rush hour traffic. How was his day? Does he live in the area? Is he originally from the city? If not, when did he come to your city? Interesting conversations may arise.</li>
      </ul>
    </section>

    <section class="flex flex-col gap-y-3">
      <h1 class="font-bold">Home, Belonging, and Ownership</h1>
      <ul class="list-disc list-inside flex flex-col gap-y-3">
        <li>Who lived in your house before you?</li>
        <li>Maps are all about boundaries that may come with loss of belonging or shifting power. Boundaries exist at all scales, from gates to walls, and your reflections on them will help shape our understanding better.</li>
        <li>Some of us have found homes away from the places we grew up in - sometimes in the strangest of places, and often in faraway lands from our original homes. Homes are often a safe space where we take respite and practice mindfulness, but can also become challenging spaces where we become receptive to the mundane and everyday. Continued engagement with our home(s) during the pandemic has helped us renegotiate our relationship with home.</li>
      </ul>
    </section>

    <section class="flex flex-col gap-y-3">
      <h1 class="font-bold">We look forward to reading your story at The Reading Room!</h1>
    </section>
  </main>

</div>