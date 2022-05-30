<script>
    import { post } from "$lib/utils.js";
    import { afterNavigate } from "$app/navigation";

    let email = "";
    let username = "";
    let errors = "";
    let isLinkSent = false;
    let context = { fromURL : "/"};

    async function submitForm() {
        //const response = await post(`api/passwordless/send-link`, { email, username }, null);
        console.log();

        const response = await post(`/auth/register`, { email, username, context });

        //console.log(data)
        if (response.error) errors = response.error.message;

        if (response.sent) {
            isLinkSent = true;
            errors="email sent"
        }
    }

    afterNavigate((event) => {
        context.fromURL = event.from?.pathname
        console.log(context);
    });
</script>

<form on:submit|preventDefault={submitForm} class="flex flex-col w-full items-center text-sm">
    <fieldset class="w-1/2 mb-4">
        <label class="block mb-3.5"
            ><p>Username</p>
            <input
                type="text"
                bind:value={username}
                name="username"
                placeholder="Enter Username"
                required />
        </label>

        <label>
            <p>Email ID</p>
            <input
                type="text"
                bind:value={email}
                name="email"
                placeholder="Enter email id"
                required />
        </label>
    </fieldset>
    <slot name="checkbox" />
    <button
        class="w-fit bg-accent text-sm text-primary mt-4 px-4 py-2"
        type="submit"
        disabled={isLinkSent}>Send MagicLink</button>
    <p class="font-text text-accent">
        {errors}
    </p>
</form>

<style lang="postcss">
    input[type="text"] {
        @apply w-full text-contrast placeholder-accent bg-primary border-solid border border-black px-2 py-1;
    }
</style>
