<script>
import { goto } from "$app/navigation";
import { page } from "$app/stores"
import { onMount } from "svelte";

const target = $page.params.slug

onMount(() => {
  setTimeout(() => {
    goto(`/adventure/read?story=${target}`)
  }, 2000)
})

</script>

<div class="text-3xl">
  You are now travelling to {target}!
</div>