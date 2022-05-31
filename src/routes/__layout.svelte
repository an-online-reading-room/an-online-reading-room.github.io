<script>
  import "../app.css";

  import { theme } from '$stores/theme'
</script>


<svelte:head>
  <title>
    The Reading Room
  </title>
  <meta charset="UTF-8"/>
  <meta name="description" content=""/>
  <meta http-equiv="x-ua-compatible" content="ie=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"/>

  <link rel="apple-touch-icon"      sizes="180x180" href="/img/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="96x96"   href="/img/favicons/favicons/android-chrome-192x192.png">
  <link rel="icon" type="image/png" sizes="16x16"   href="/img/favicons/favicons/android-chrome-384x384.png">
  <link rel="icon" type="image/png" sizes="16x16"   href="/img/favicons/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32"   href="/img/favicons/favicon-32x32.png">

  <meta property="og:title" content="The Reading Room" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="The Reading Room is a collaborative storytelling project that enables us to think of place differently. Through storytelling, we can take the initiative of re-defining a place beyond its history and geography.">
  <meta property="og:url" content="https://thereadingroom.online/" />
  <meta property="og:image" content="http://thereadingroom.online/img/illustration-small.png" />
  <meta property="og:image:alt" content="Person running toward a book floating in the air. There are houses, trees, and animals in the background." />
  <meta name="twitter:card" content="summary_large_image">
  <!-- <meta name="twitter:site" content="@website-username"> -->
  
  <!-- google fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=true>
  <link href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Karla:wght@400;500;700&display=swap" rel="stylesheet">
</svelte:head>


<div class={"h-full theme-"+$theme}>
  <main class="h-full font-display bg-primary">
    <slot></slot>
  </main>
</div>


