<script>
    import { page } from "$app/stores";
    import Background from "$components/utils/Background.svelte";
</script>

<div class="h-full mx-auto shadow-2xl background bg-cover bg-top">
    <div class="flex flex-col items-center gap-y-5 py-16">
        <h1 class="text-2xl text-contrast mb-2">The Reading Room</h1>
        <div class="bg-white/75 p-8 rounded-md">
            <slot />
            <div class="text-center text-sm mt-5">
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

    .background {
        background-image: url("/img/Full Size_Landing Page Illustration_Choose Version.png");
    }
</style>
