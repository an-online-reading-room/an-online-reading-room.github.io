<script>
  import "../app.css";
</script>


<svelte:head>
  <title>
    The Reading Room
  </title>
  <meta charset="UTF-8"/>
  <meta name="description" content=""/>
  <meta http-equiv="x-ua-compatible" content="ie=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"/>

  <!-- google fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Karla:wght@400;500;700&display=swap" rel="stylesheet">
</svelte:head>


<main class="h-full font-display bg-primary">
  <slot />
</main>


