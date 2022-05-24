<script>
  import "../app.css";

  import { theme } from '../stores/theme'
</script>

<div class={"h-full theme-"+$theme}>
  <main class="h-full font-display bg-primary">
    <slot></slot>
  </main>
</div>