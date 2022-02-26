<script>
  import Icon from '../../components/Icon.svelte'
</script>

<div class="h-36 w-36 py-2 self-center">
  <Icon src="/icons/Home Illustration.svg" alt="home illustration" />
</div>

<section class="py-6 px-10 flex flex-col gap-y-3
                font-text text-sm leading-4">
  <div class="flex flex-col gap-y-2">
    <div>
      <p>Welcome to</p>
      <p>The Reading Room!</p>
    </div>
    <p>where we save kings, fight demons, and find treasures…</p>
    <p>not those kind of treasures</p>
  </div>
  <div class="flex flex-col gap-y-2">
    <p>The real treasure is connecting with people</p>
    <p>When was the last time you explored your outdoors?</p>
  </div>
</section>

<section class="py-2 px-4 flex flex-col items-center items-center
                font-text text-sm leading-4">
  <ul class="underline list-disc text-left
            flex flex-col gap-y-3">
    <li>
      <a href="/adventure/map">just yesterday</a>
    </li>
    <li>
      <a href="/adventure/map">last month</a>
    </li>
    <li>
      <a href="/adventure/map">it's been years</a>
    </li>
  </ul>
</section>