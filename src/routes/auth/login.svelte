<script>
    import LoginForm from "$components/utils/LoginForm.svelte";
    import { afterNavigate } from "$app/navigation";
    import context from "$stores/context.js";

    afterNavigate(({ from }) => {
        if (from && from.pathname !== "/auth/signup") 
            $context = from?.pathname;
    });
</script>

<LoginForm />
