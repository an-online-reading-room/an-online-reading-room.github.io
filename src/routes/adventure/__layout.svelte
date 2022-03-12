
<script>
  import Header from '../../components/Header.svelte'
  import Icon from '../../components/Icon.svelte'
</script>

<div class="flex flex-col align-items-center gap-y-4
            w-screen h-full bg-primary
            text-center">
  <Header></Header>

  <slot></slot>

</div>

