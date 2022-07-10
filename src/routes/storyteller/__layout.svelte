<script>
    import Header from "$components/Header.svelte";
    import Modal from "$components/utils/Modal.svelte";
    import { user } from "$stores/user";
    import { browser } from "$app/env";

    let isAwaiting = true;
    let isLoggedIn = false;
    if (browser) {
        if ($user.jwt) {
            const expiry = JSON.parse(atob($user.jwt.split(".")[1])).exp * 1000;
            if (Date.now() >= expiry) {
                isLoggedIn = false;
            } else {
                console.log("logged in as user", $user.username);
                isLoggedIn = true;
            }
        }
        isAwaiting = false;
    }
</script>

<div class="relative flex flex-col h-full">
    {#if isAwaiting}
        <div />
    {:else if isLoggedIn}
        <Header />
        <slot />
    {:else}
    <div class="background h-full bg-top bg-cover">
        <Modal isOpenModal={true} showCloseButton={false}>
            <div class="px-4">
                <p class="font-bold mb-2">Tell us your story!</p>
                <p>
                    Please <a class="font-bold underline" href="/auth/login"
                        >log in</a> to use this feature.
                </p>
                <p>Worried about what story to share? Check out our prompts.</p>
            </div>
        </Modal>
    </div>
    {/if}
</div>

<style>
    .background {
        background-image: url("/img/Full Size_Landing Page Illustration_Choose Version.png");
    }
</style>
