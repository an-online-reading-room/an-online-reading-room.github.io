<script>
    import Header from "$components/Header.svelte";
    import { user } from "$stores/user";
    import { goto, beforeNavigate } from "$app/navigation";
    import { browser } from "$app/env";

    if (browser) {
        if ($user.jwt) {
            console.log("logged in as user", $user.username);
        } else {
            //goto("/auth/login");
    
            if (confirm("Please login")) {
                goto("/auth/login")
            } else {
                goto("/")
            }
        }
    }
</script>

<div class="relative flex flex-col max-w-screen-sm h-full mx-auto shadow-2xl">
    <Header />
    <main class="overflow-y-auto flex-1 pb-16">
        <slot />
    </main>
</div>
