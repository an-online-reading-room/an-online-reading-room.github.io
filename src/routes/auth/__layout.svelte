<script>
    import { page } from "$app/stores";
    import Background from "$components/utils/Background.svelte";
</script>

<div class="max-w-screen-sm h-full mx-auto shadow-2xl ">
    <Background>
        <div class="flex flex-col items-center gap-y-5 py-16">
            <h1 class="text-2xl text-contrast mb-2">The Reading Room</h1>
            <slot />
            <div class="text-center text-sm">
                {#if $page.routeId == "auth/signup"}
                    <a href="/auth/login">Login</a>
                    <a href="/">Continue as guest</a>
                {:else if $page.routeId == "auth/login"}
                    <a href="/auth/signup">Signup</a>
                    <a href="/">Continue as guest</a>
                {/if}
            </div>
        </div>
    </Background>
</div>

<style lang="postcss">
    a {
        @apply block text-sm underline;
    }
</style>
