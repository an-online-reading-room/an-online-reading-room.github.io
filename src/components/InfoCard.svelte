<script>


export let open
export let info

</script>
  
{#if open}
<div
    class="z-10 absolute inset-x-0 bottom-12
                bg-accent text-primary text-base
                py-6 px-10">
    <div class="flex flex-col gap-y-2 text-left">

        <h1 class="font-display font-bold text-base">{info.title}</h1>
        <p class="font-text text-xs">by {info.user.username}</p>
        <p class="font-text text-sm">{info.location}</p>
        <p class="font-display text-sm">{info.description}</p>

    </div>
</div>
{/if}