<script>
    import Footer from "$components/Footer.svelte";
    import ShareIcon from "$components/icons/ShareIcon.svelte";
    import LinkIcon from "$components/icons/LinkIcon.svelte";
    import BookmarkIcon from "$components/icons/BookmarkIcon.svelte";
    import Exclamation from "$components/icons/Exclamation.svelte";
    import { goto } from "$app/navigation";
    import { put } from "$lib/api.js";
    import { user } from "$stores/user.js";

    let showEditUsernameForm = false;
    let showEditEmailForm = false;

    let username = "";
    let email = "";
    let errors = "";
    const openUsername = () => {
        showEditUsernameForm = true;
        closeEmail();
    };

    const openEmail = () => {
        showEditEmailForm = true;
        closeUsername();
    };
    const closeUsername = () => {
        showEditUsernameForm = false;
        username = "";
        errors = "";
    };

    const closeEmail = () => {
        showEditEmailForm = false;
        email = "";
        errors = "";
    };
    const updateUsername = async () => {
        //await api.put("/users/update")
        const res = await put(`api/users/update`, { username }, $user.jwt);
        console.log(res);
        if (res.error) {
            errors = res.error.message;
        } else {
            showEditUsernameForm = false;
            username = "";
        }
    };
    const updateEmail = async () => {
        //await api.put("/users/update")
        const res = await put(`api/users/update`, { email }, $user.jwt);
        if (res.error) {
            errors = res.error.message;
        } else {
            showEditEmailForm = false;
            email = "";
        }
    };
    const logout = () => {
        $user = {};
        goto("auth/login");
    };
</script>

<div class="flex-column gap-y-2 px-8 py-3.5 pb-12 border-t border-contrast">
    <p class="font-display font-bold text-4xl">Profile</p>
    <button on:click|preventDefault={openUsername}>
        <div class="btn">Edit username</div>
    </button>
    {#if showEditUsernameForm}
        <form
            on:submit|preventDefault={updateUsername}
            class="flex flex-col items-start text-sm gap-2">
            <input
                type="text"
                bind:value={username}
                name="username"
                placeholder="Enter Username"
                required
                class="w-full h-8 px-4 py-3" />
            {#if errors}
                <div class="inline-flex items-center">
                    <Exclamation />
                    <span class="pt-0.5 px-2 font-text text-accent text-xs">
                        {errors}
                    </span>
                </div>
            {/if}
            <div class="flex gap-2 w-full">
                <button
                    on:click={updateUsername}
                    type="submit"
                    class="w-1/3 px-4 py-1 text-accent rounded-sm border-2 border-accent"
                    >Confirm</button>
                <button
                    on:click={(e) => {
                        showEditUsernameForm = false;
                        username = "";
                        errors = "";
                    }}
                    class="w-1/3 px-4 py-1 text-accent rounded-sm border-2 border-accent">
                    Cancel
                </button>
            </div>
        </form>
    {/if}
    <button on:click|preventDefault={openEmail}>
        <div class="btn">Update Email ID</div>
    </button>

    {#if showEditEmailForm}
        <form
            on:submit|preventDefault={updateEmail}
            class="flex flex-col items-start text-sm gap-2">
            <input
                type="text"
                bind:value={email}
                name="email"
                placeholder="Enter email"
                required
                class="w-full h-8 px-4 py-3" />
            {#if errors}
                <div class="inline-flex items-center">
                    <Exclamation />
                    <span class="pt-0.5 px-2 font-text text-accent text-xs">
                        {errors}
                    </span>
                </div>
            {/if}
            <div class="flex gap-2 w-full">
                <button
                    type="submit"
                    class="w-1/3 px-4 py-1 text-accent rounded-sm border-2 border-accent"
                    >Confirm</button>
                <button
                    on:click={(e) => {
                        showEditEmailForm = false;
                        email = "";
                        errors = "";
                    }}
                    class="w-1/3 px-4 py-1 text-accent rounded-sm border-2 border-accent">
                    Cancel
                </button>
            </div>
        </form>
    {/if}
    <button on:click={logout}>
        <div class="btn">Logout</div>
    </button>
</div>
<Footer>
    <button class="stroke-current w-6 h-6">
        <BookmarkIcon />
    </button>
    <button class="stroke-current w-6 h-6">
        <LinkIcon />
    </button>
    <button class="stroke-current w-6 h-6">
        <ShareIcon />
    </button>
</Footer>

<style lang="postcss">
    .btn {
        @apply bg-accent text-primary text-sm px-4 py-3 text-left;
    }
</style>
