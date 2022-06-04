<script>
    import { post } from "$lib/utils.js";
    import { context } from "$stores/context.js";
    let email = "";
    let username = "";
    let errors = "";
    let isLinkSent = false;
    $: buttonText = isLinkSent ? "Resend MagicLink" : "Send MagicLink";

    async function submitForm() {
        const context_string = JSON.stringify({ redirectUrl: $context });
        const response = await post(`/auth/register`, {
            email,
            username,
            context_string,
        });
        if (response.error) errors = response.error.message;
        if (response.sent) {
            isLinkSent = true;
            errors = "Email sent";
        }
    }
</script>

<form
    on:submit|preventDefault={submitForm}
    class="flex flex-col w-full items-center text-sm">
    <fieldset class="w-1/2 mb-4">
        <label class="block mb-3.5"
            ><p>Username</p>
            <input
                type="text"
                bind:value={username}
                name="username"
                placeholder="Enter Username"
                required
                autocomplete="username" />
        </label>

        <label>
            <p>Email ID</p>
            <input
                type="text"
                bind:value={email}
                name="email"
                placeholder="Enter email id"
                required
                autocomplete="email" />
        </label>
    </fieldset>
    <slot name="checkbox" />
    <button
        class="w-fit bg-accent text-sm text-primary mt-4 px-4 py-2"
        type="submit">{buttonText}</button>
    {#if errors}
        <p class="font-text text-accent">
            {errors}
        </p>
    {/if}
</form>

<style lang="postcss">
    input[type="text"] {
        @apply w-full text-contrast placeholder-accent bg-primary border-solid border border-contrast px-2 py-1;
    }
    label {
        @apply text-contrast;
    }
</style>
