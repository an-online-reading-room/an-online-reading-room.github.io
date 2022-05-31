<script>
  import Header from "$components/Header.svelte"
</script>

<div class="flex flex-col align-items-center
            w-screen h-full bg-primary
            divide-y
            text-center">
  <Header></Header>

  
  <slot></slot>
  

</div>