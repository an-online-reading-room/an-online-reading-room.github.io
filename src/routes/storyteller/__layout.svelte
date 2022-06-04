<script>
    import Header from "$components/Header.svelte";
    import Modal from "$components/utils/Modal.svelte";
    import Background from "$components/utils/Background.svelte";
    import { user } from "$stores/user";
    import { browser } from "$app/env";

    let isLoggedIn = false;
    if (browser) {
        if ($user.jwt) {
            console.log("logged in as user", $user.username);
            isLoggedIn = true;
        }
    }
</script>

<div class="relative flex flex-col max-w-screen-sm h-full mx-auto shadow-2xl">
    {#if isLoggedIn}
        <Header />
        <main class="overflow-y-auto flex-1 border-t border-contrast pb-16">
            <slot />
        </main>
    {:else}
        <Background>
            <Modal isOpenModal={true} showCloseButton={false}>
                <p class="font-bold mb-2">Tell us your story!</p>
                <p>
                    Please <a class="font-bold underline" href="/auth/login"
                        >log in</a> to use this feature.
                </p>
                <p>Worried about what story to share? Check out our prompts.</p>
            </Modal>
        </Background>
    {/if}
</div>
