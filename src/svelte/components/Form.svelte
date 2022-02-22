<script>
  // import dotenv from 'dotenv'
  // dotenv.config()
  import { onMount } from "svelte";
  
  const API_URL = 'https://reading-room-backend.herokuapp.com/api'
  let form, editor

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    const authorData = {
      data: {
        username: data.get('username')
      }
    }
    const storyData = {
      data: {
        title: data.get('title'),
        location: data.get('location'),
      }
    }
    editor.save().then(data => {
      storyData.data.submission = data
    }) 
    fetch(`${API_URL}/authors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorData)
    })
    .then(response => response.json())
    .then(data => storyData.data.author = data.data.id)
    .then(() => {
      fetch(`${API_URL}/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData)
      })
      .then(response => window.location.reload())
    })
  }

  onMount(() => {
    form.addEventListener('submit', handleSubmit);
    editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Add Storyblock'
    })
  })
</script>

<main>
  <form bind:this={form} enctype="multipart/form-data" method="post"
        class="flex flex-col gap-4 px-4 py-8
                font-text text-sm leading-4">

    <fieldset>
      <legend class="hidden">Title</legend>
      <input type="text" name="title" id="title" placeholder="Title" required
              class="w-full px-2 py-2 border placeholder:text-black">
    </fieldset>

    <fieldset>
      <legend class="hidden">Author's Username</legend>
      <input type="text" name="username" id="username" placeholder="Author's Username" required
              class="w-full px-2 py-2 border placeholder:text-black">
    </fieldset>

    <fieldset>
      <legend class="hidden">Location</legend>
      <input type="text" name="location" id="location" placeholder="Add Location" require
              class="w-full px-2 py-2 border placeholder:text-black">
    </fieldset>

    <!-- <fieldset>
      <legend class="hidden">Storyblock</legend>
      <input type="text" name="story" id="story" placeholder="Add Storyblock"
              class="w-full px-2 py-2 border placeholder:text-black">
      
    </fieldset> -->
    <section class="w-full placeholder:text-black"
             id="editor"></section>
    
    <button type="submit"
            class="mt-auto p-2
                    self-center text-white font-display text-xs bg-black">
      Submit
    </button>

  </form>

</main>
