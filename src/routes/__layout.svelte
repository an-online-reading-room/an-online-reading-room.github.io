<script>
    import "../app.css";

    import { theme } from "$stores/theme";
</script>

<div class={"h-full theme-" + $theme}>
    <div class="lg:hidden h-full font-display bg-primary">
        <slot />
    </div>
    <div class="hidden h-full lg:block text-center font-text pt-56 bg-primary">
        The Reading Room is only viewable on phones and tablets. See you there!
    </div>
</div>
