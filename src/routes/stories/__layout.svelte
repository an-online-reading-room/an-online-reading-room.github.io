<script>
  import Header from "../../components/Header.svelte"
</script>

<div class="flex flex-col align-items-center gap-y-4
            w-screen h-screen bg-primary
            text-center">
  <Header></Header>

  <slot></slot>

</div>