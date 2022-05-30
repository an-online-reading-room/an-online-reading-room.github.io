<script>
    import { page } from "$app/stores";


</script>

<div class="max-w-screen-sm h-full mx-auto shadow-2xl ">
    <div
        class="w-full h-full bg-contain bg-no-repeat bg-bottom bg-[url('/img/main-illustration-green-cropped.png')]">
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
    </div>
</div>

<style lang="postcss">
    a {
        @apply block text-sm underline;
    }
</style>
