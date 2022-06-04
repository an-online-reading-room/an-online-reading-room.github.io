<script>
    import LoginForm from "$components/utils/LoginForm.svelte"
</script>
<LoginForm>
    <label class="font-text text-xs" slot="checkbox">
        <input
            class="accent-accent"
            type="checkbox"
            name="accept"
            required />
        I accept the
        <a class="underline" href="/terms-and-conditions">
            terms and conditions</a>
    </label>
</LoginForm>
